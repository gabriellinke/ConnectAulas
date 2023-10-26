import { useState } from "react";
import { View, Text } from "react-native";
import styles from '../styles';
import { router } from "expo-router";
import Input from "../../../src/components/Input";
import Button from "../../../src/components/Button";

const Student = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();

    const handleAccountCreation = () => {
        console.log("Cadastro do aluno");
        // TODO: validar inputs
        // Enviar requisição para o backend
        // Mostrar mensagem de cadastro concluído
        router.back();
    }

    return (
        <View>
            <Text style={[styles.title, {marginTop: 16}]}>
                Cadastre-se como {'\n'}Aluno
            </Text>
            <View style={{marginTop: 80}}>
                <Input label="Email*" value={email} setValue={setEmail}/>
                <Input label="Senha*" value={password} setValue={setPassword} isPassword/>
                <Input label="Nome*" value={name} setValue={setName}/>
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