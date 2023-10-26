import { useState } from "react";
import { View, Text } from "react-native";
import styles from '../styles';
import { router } from 'expo-router';
import Input from "../../../src/components/Input";

const Teacher = () => {
    const [page, setPage] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleAccountCreation = () => {
        console.log("Cadastro do aluno");
        // TODO: validar inputs
        // Enviar requisição para o backend
        // Mostrar mensagem de cadastro concluído
        router.back();
    }

    const validateInputAndAdvance = (page) => {
        switch(page) {
            case 1:
                if(email != "" && password != "")
                    break;
                // TODO: Handle input inválido
                console.log("Erro: Input não é válido");
            case 2:
                if(name != "")
                    break;
                // TODO: Handle input inválido
                console.log("Erro: Input não é válido")
        }
        setPage(page+1);
    }

    return (
        <View>
            <Text style={[styles.title, {marginTop: 16}]}>
                Cadastre-se como {'\n'}Professor
            </Text>
            {page == 1 ? (
                <>
                    <Text>Informações para acesso</Text>
                    <View style={{marginTop: 80}}>
                    <Input label="Email*" value={email} setValue={setEmail}/>
                    <Input label="Senha*" value={password} setValue={setPassword} isPassword/>
                    <View style={[styles.buttonGroup, {marginTop: 16}]}>
                        <Button 
                            text="Voltar" 
                            width={'48%'} 
                            height={56} 
                            type={"purple"}
                            onPress={() => router.back()}
                        />
                        <Button
                            text="Próximo"
                            width={'48%'} 
                            height={56} 
                            type={"green"}
                            onPress={() => validateInputAndAdvance(page)}
                        />
                    </View>
                    </View>
                </>
            ): page == 2 ? (
                <>
                    <Text>Seus dados - informações gerais</Text>
                    <View style={{marginTop: 80}}>
                    <View style={[styles.buttonGroup, {marginTop: 16}]}>
                        <Button 
                            text="Voltar" 
                            width={'48%'} 
                            height={56} 
                            type={"purple"}
                            onPress={() => setPage(page-1)}
                        />
                        <Button
                            text="Próximo"
                            width={'48%'} 
                            height={56} 
                            type={"green"}
                            onPress={() => validateInputAndAdvance(page)}
                        />
                    </View>
                    </View>
                </>
            ): page == 3 ? (
                <>
                    <Text>Seus dados - foto de perfil</Text>
                    <View style={{marginTop: 80}}>
                    <View style={[styles.buttonGroup, {marginTop: 16}]}>
                        <Button 
                            text="Voltar" 
                            width={'48%'} 
                            height={56} 
                            type={"purple"}
                            onPress={() => setPage(page-1)}
                        />
                        <Button
                            text="Próximo"
                            width={'48%'} 
                            height={56} 
                            type={"green"}
                            onPress={() => validateInputAndAdvance(page)}
                        />
                    </View>
                    </View>
                </>
            ): page == 4 ? (
                <>
                    <Text>Sobre a aula</Text>
                    <View style={{marginTop: 80}}>
                    <View style={[styles.buttonGroup, {marginTop: 16}]}>
                        <Button 
                            text="Voltar" 
                            width={'48%'} 
                            height={56} 
                            type={"purple"}
                            onPress={() => setPage(page-1)}
                        />
                        <Button
                            text="Próximo"
                            width={'48%'} 
                            height={56} 
                            type={"green"}
                            onPress={() => validateInputAndAdvance(page)}
                        />
                    </View>
                    </View>
                </>
            ): (
                <>
                    <Text>Horários disponíveis</Text>
                    <View style={{marginTop: 80}}>
                    <View style={[styles.buttonGroup, {marginTop: 16}]}>
                        <Button 
                            text="Voltar" 
                            width={'48%'} 
                            height={56} 
                            type={"purple"}
                            onPress={() => setPage(page-1)}
                        />
                        <Button
                            text="Finalizar"
                            width={'48%'} 
                            height={56} 
                            type={"green"}
                            onPress={handleAccountCreation}
                        />
                    </View>
                    </View>
                </>
            )}

        </View>
    );
};
export default Teacher;