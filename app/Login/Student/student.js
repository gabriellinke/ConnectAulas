import { useState } from "react";
import { View, Text } from "react-native";
import styles from '../styles';
import { Link } from 'expo-router';
import Input from "../../../src/components/Input";

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
            </View>
        </View>
    );
};
export default Student;