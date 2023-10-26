import { TextInput, View, Text } from "react-native";
import styles from './styles';
import * as Colors from '../../styles/colors'

const Input = ({
    placeholder = "",
    label = "label",
    value = "",
    setValue = () => {},
    isPassword = false,
    numberOfLines=1,
}) => {
  return (
    <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={[styles.input, {height: 34 + 20*numberOfLines}]}
            placeholder={placeholder}
            placeholderTextColor={`${Colors.TEXT_INPUTS}`}
            value={value}
            onChangeText={text => setValue(text)}
            secureTextEntry={isPassword}
            multiline={numberOfLines > 1}
            numberOfLines={numberOfLines}
        />
    </View>
  );
};
export default Input;