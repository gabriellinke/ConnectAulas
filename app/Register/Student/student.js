import { useState } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { router } from "expo-router";
import { useAuth, useFirestore } from "reactfire";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import styles from '../styles';
import { getErrorMessage } from "../../../src/utils/firebase/errors";
import Input from "../../../src/components/Input";
import Button from "../../../src/components/Button";
import { doc, setDoc } from "firebase/firestore";

const Student = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    
    const auth = useAuth();
    const firestore = useFirestore();

    const handleAccountCreation = async () => {
        console.log("Cadastro do aluno");

        // TODO: validar inputs

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: name,
            });

            await setDoc(doc(firestore, "students", userCredential.user.uid), {
                userUid: userCredential.user.uid,
                name,
                favoriteTeachers: [],
            });

            ToastAndroid.show("Cadastro concluído!", ToastAndroid.LONG);
            
            router.back();
        }
        catch (err) {
            if (err instanceof FirebaseError) {
                ToastAndroid.show(getErrorMessage(err), ToastAndroid.LONG);
            }
            else {
                throw err;
            }
        }
    }

    return (
        <View>
            <Text style={[styles.title, {marginTop: 16}]}>
                Cadastre-se como {'\n'}Aluno
            </Text>
            <View style={{marginTop: 80}}>
                <Input label="Email*" value={email} setValue={setEmail} placeholder="email@example.com"/>
                <Input label="Senha*" value={password} setValue={setPassword} isPassword placeholder="********"/>
                <Input label="Nome*" value={name} setValue={setName} placeholder="Nome Sobrenome"/>
                <View style={[styles.buttonGroup, {marginTop: 16}]}>
                    <Button
                        text="Criar cadastro"
                        width={'100%'} 
                        height={56} 
                        type={"green"}
                        onPress={handleAccountCreation}
                    />
                </View>
            </View>
        </View>
    );
};
export default Student;