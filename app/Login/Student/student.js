import { useEffect, useState } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { router } from "expo-router";
import { useAuth, useFirestore } from "reactfire";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { FirebaseError } from "@firebase/util";
import { doc, getDoc } from "firebase/firestore";

import styles from '../styles';
import Input from "../../../src/components/Input";
import Button from "../../../src/components/Button";
import { getErrorMessage } from "../../../src/utils/firebase/errors";

const Student = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const auth = useAuth();
    const firestore = useFirestore();
  
    const isStudent = async (uid) => {
      try {
        const studentDocRef = doc(firestore, `students/${uid}`);
        const docSnapshot = await getDoc(studentDocRef);
    
        return docSnapshot.exists();
      } catch (error) {
        console.error("Error checking teacher existence: ", error);
        throw error;
      }
    }
    
    const handleLogin = async () => {
        console.log("Login student");

        try {
            await signInWithEmailAndPassword(auth, email, password);

            try {
                if (!auth.currentUser || !(await isStudent(auth.currentUser.uid))) {
                    ToastAndroid.show("Usuário não é professor", ToastAndroid.LONG);
                    await auth.signOut();
                    return;
                }
            }
            catch {
                ToastAndroid.show("Erro na verificação de usuário", ToastAndroid.LONG);
                await auth.signOut();
                return;
            }

            router.replace({pathname: "HomeStudent"});
        }
        catch (err) {
            if (err instanceof FirebaseError) {
                ToastAndroid.show(getErrorMessage(err), ToastAndroid.LONG);
                console.error(err)
            }
            else {
                throw err;
            }
        }
    }
    
    return (
        <View>
            <Text style={[styles.title, {marginTop: 16}]}>
                Entre como {'\n'}Aluno
            </Text>
            <View style={{marginTop: 80}}>
                <Input label="Email" value={email} setValue={setEmail} placeholder="email@example.com"/>
                <Input label="Senha" value={password} setValue={setPassword} isPassword placeholder="********"/>
                <View style={[styles.buttonGroup, {marginTop: 16}]}>
                    <Button 
                        text="Cadastrar" 
                        width={'48%'} 
                        height={56} 
                        type={"purple"}
                        onPress={() => router.push({pathname: 'Register', params: { value: 'study' } })}
                    />
                    <Button
                        text="Entrar"
                        width={'48%'} 
                        height={56} 
                        type={"green"}
                        onPress={handleLogin}
                    />
                </View>
            </View>
        </View>
    );
};
export default Student;