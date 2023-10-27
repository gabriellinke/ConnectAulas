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
    maskType = "none",
}) => {
  const formatInput = (text, maskType) => {
    if (maskType === "schedule") {
        // Máscara para horário (00:00)
        text = text.replace(/\D/g, "");

        // Verifique o primeiro número
        if (text.length >= 1) {
          const firstDigit = parseInt(text.charAt(0));
          if (firstDigit > 2) {
            text = text.slice(0,-1);
          }
        }
    
        // Verifique o segundo número
        if (text.length >= 2) {
          const secondDigit = parseInt(text.charAt(1));
          if (text.charAt(0) === '2' && secondDigit > 4) {
            text = text.slice(0,-1);
          }
        }
    
        // Verifique o terceiro número
        if (text.length >= 3) {
          const thirdDigit = parseInt(text.charAt(2));
          if (thirdDigit > 5) {
            text = text.slice(0,-1);
          }
        }
    
        if(text.length > 4) {
          text = text.substring(0,4);
        }
    
        // Insira o caractere ':' automaticamente
        if (text.length >= 2) {
          text = text.substring(0, 2) + ':' + text.substring(2);
        }

    } else if (maskType === "phone") {
      // Máscara para telefone ( (99) 99999-9999)
      if (text.length <= 15) {
        text = text.replace(/\D/g, "");
        text = text.replace(/(\d{2})(\d{1,5})(\d{0,4})/, "($1) $2-$3");
      } else {
        text = text.substring(0, 15);
      }
    } else if (maskType === "price") {
        // Máscara para preço (somente números)
        text = text.replace(/[^\d.]/g, "");

        // Permite apenas um ponto decimal
        if (text.split('.').length > 2) {
            text = text.substring(0, text.lastIndexOf('.'));
        }

    }

    return text;
  };

  return (
    <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={[styles.input, {height: 34 + 20*numberOfLines}]}
          placeholder={placeholder}
          placeholderTextColor={`${Colors.TEXT_INPUTS}`}
          value={value}
          onChangeText={text => setValue(formatInput(text, maskType))}
          secureTextEntry={isPassword}
          multiline={numberOfLines > 1}
          numberOfLines={numberOfLines}
          keyboardType={maskType != "none" ? "numeric" : "default"}
        />
    </View>
  );
};
export default Input;