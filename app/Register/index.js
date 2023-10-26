import { View, Text } from "react-native";
import styles from './styles';
import { Link } from 'expo-router';
import Teacher from "./Teacher/teacher";
import Student from "./Student/student";
import { useLocalSearchParams } from 'expo-router';

const Login = () => {
  const params = useLocalSearchParams();
  return (
    <View style={styles.container}> 
    {params.value == 'teach' ? (
      <Teacher />
    ) : (
      <Student />
    )}  
    </View>
  );
};
export default Login;