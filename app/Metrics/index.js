import { useState } from "react";
import { View, Image, Text } from "react-native";
import landingImg from '../../src/assets/home_image.png';
import styles from './styles';

const Metrics = () => {
  const [conections, setConections] = useState(8000); 
  const [communities, setCommunities] = useState(50); 
  const [teachers, setTeachers] = useState(5000); 
  const [students, setStudents] = useState(101); 
  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner}/>

      <Text style={styles.defaultText}>Nós já:</Text>

      <Text style={styles.defaultText}>
        {`\u2022`} Cadastramos{' '}
        <Text style={styles.boldUnderlinedText}>{students}</Text>{' '}
        <Text style={styles.boldText}>alunos</Text> e{' '}
        <Text style={styles.boldUnderlinedText}>{teachers}</Text>{' '}
        <Text style={styles.boldText}>professores</Text>.
      </Text>
      <Text style={styles.defaultText}>
        {`\u2022`} Construímos{' '}
        <Text style={styles.boldUnderlinedText}>{communities}</Text>{' '}
        <Text style={styles.boldText}>comunidades</Text>.
      </Text>
      <Text style={styles.defaultText}>
        {`\u2022`} Conectamos{' '}
        <Text style={styles.boldUnderlinedText}>mais de {conections}</Text>{' '}
        <Text style={styles.boldText}>pessoas</Text>.
      </Text>
    </View>
  );
};
export default Metrics;