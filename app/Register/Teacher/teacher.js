import { useState } from "react";
import { View, Text } from "react-native";
import styles from '../styles';
import { Link } from 'expo-router';
import Input from "../../../src/components/Input";

const Teacher = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    return (
        <View>
            <Text style={[styles.title, {marginTop: 16}]}>
                Cadastre-se como {'\n'}Professor
            </Text>
            <View style={{marginTop: 80}}>
                <Input label="Email" value={email} setValue={setEmail}/>
                <Input label="Senha" value={password} setValue={setPassword} isPassword/>
            </View>
        </View>
    );
};
export default Teacher;