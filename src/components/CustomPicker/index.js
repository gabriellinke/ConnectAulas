import { View, Text } from "react-native";
import styles from './styles';
import { Picker } from '@react-native-picker/picker';

const CustomPicker = ({
    label = "label",
    value = "",
    setValue = () => {},
    options = [],
}) => {
  return (
    <View>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            style={{width: '100%'}}
            selectedValue={value}
            onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
            mode="dropdown"
          >
            <Picker.Item enabled={false} label={"Selecione uma opção"} value={""} />
            {options.map((item, index) => (
              <Picker.Item key={index} label={item} value={index} />
            ))}
          </Picker>
        </View>
    </View>
  );
};
export default CustomPicker;