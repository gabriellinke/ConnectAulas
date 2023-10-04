import { TextInput, View, Text } from "react-native";
import styles from './styles';
import * as Colors from '../../styles/colors'

const Input = ({
    placeholder = "",
    label = "label",
    value = "",
    setValue = () => {},
    isPassword = false,
}) => {
  return (
    <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={`${Colors.TEXT_INPUTS}`}
            value={value}
            onChangeText={text => setValue(text)}
            secureTextEntry={isPassword}
        />
    </View>
  );
};
export default Input;