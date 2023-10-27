import { useState } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import Input from "../../../src/components/Input";
import Button from "../../../src/components/Button";
import styles from '../styles';

const Teacher = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleLogin = () => {
        console.log("Login teacher");
        // TODO: logar usuário usando backend
        // Salvar token do usuário para persistir seção
        router.replace({pathname: 'Metrics', params: { value: 'teach' } })
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