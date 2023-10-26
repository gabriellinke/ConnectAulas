import { useState } from "react";
import { View, Text } from "react-native";
import styles from '../styles';
import { router } from "expo-router";
import Input from "../../../src/components/Input";
import Button from "../../../src/components/Button";

const Student = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    return (
        <View>
            <Text style={[styles.title, {marginTop: 16}]}>
                Entre como {'\n'}Aluno
            </Text>
            <View>
                <Input label="Email" value={email} setValue={setEmail}/>
                <Input label="Senha" value={password} setValue={setPassword} isPassword/>
                <View style={[styles.buttonGroup, {marginTop: 16}]}>
                    <Button 
                        text="Cadastrar" 
                        width={'48%'} 
                        height={56} 
                        type={"purple"}
                        onPress={() => router.push('Metrics')}
                    />
                    <Button
                        text="Entrar"
                        width={'48%'} 
                        height={56} 
                        type={"green"} 
                    />
                </View>
            </View>
        </View>
    );
};
export default Student;