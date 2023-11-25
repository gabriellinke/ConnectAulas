import { useState, useEffect } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { router } from "expo-router";
import { useAuth, useFirestore } from "reactfire";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { FirebaseError } from "@firebase/util";
import { doc, getDoc } from "firebase/firestore";

import styles from '../styles';
import Input from "../../../src/components/Input";
import Button from "../../../src/components/Button";
import LoadingScreen from "../../../src/components/LoadingScreen";
import { getErrorMessage } from "../../../src/utils/firebase/errors";

const Teacher = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [triedAutoLogin, setTriedAutoLogin] = useState(false);

    const auth = useAuth();
    const firestore = useFirestore();
  
    const isTeacher = async (uid) => {
      try {
        const teacherDocRef = doc(firestore, `teachers/${uid}`);
        const docSnapshot = await getDoc(teacherDocRef);
    
        return docSnapshot.exists();
      } catch (error) {
        console.error("Error checking teacher existence: ", error);
        throw error;
      }
    }
    
    const handleLogin = async () => {
        console.log("Login teacher");

        try {
            await signInWithEmailAndPassword(auth, email, password);

            try {
                if (!auth.currentUser || !(await isTeacher(auth.currentUser.uid))) {
                    ToastAndroid.show("Usuário não é professor", ToastAndroid.LONG);
                    await auth.signOut();
                }
            }
            catch {
                ToastAndroid.show("Erro na verificação de usuário", ToastAndroid.LONG);
                await auth.signOut();
                return;
            }

            router.replace({pathname: "HomeTeacher"});
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

    const autoLogin = async () => {
        try {
            if (auth.currentUser != null && (await isTeacher(auth.currentUser.uid))) {
                router.replace({pathname: "HomeTeacher"});
            }
        }
        finally {
            setTriedAutoLogin(true);
        }
    };

    useEffect(() => {
        autoLogin();
    }, []);

    if (!triedAutoLogin) {
        return <LoadingScreen />;
    }

    return (
        <View>
            <Text style={[styles.title, {marginTop: 16}]}>
                Entre como {'\n'}Professor
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
                        onPress={() => router.push({pathname: 'Register', params: { value: 'teach' } })}
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
export default Teacher;