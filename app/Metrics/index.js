import { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";
import landingImg from '../../src/assets/home_image.png';
import styles from './styles';
import { useFirestore } from "reactfire";
import { doc, onSnapshot, collection, getCountFromServer } from "firebase/firestore";

const useMetricsCounts = () => {
  const firestore = useFirestore();

  const [connectionsCount, setConnectionsCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [communitiesCount, setCommunitiesCount] = useState(0);
  
  const [counts, setCounts] = useState({ connections: 0, teachers: 0, students: 0, communities: 0 });

  const connectionsRef = doc(firestore, "metrics/connections");

  useEffect(() => {
    const unsubscribeConnections = onSnapshot(connectionsRef, (doc) => {
      if (doc.exists()) {
        setConnectionsCount(doc.data().count);
      }
    });

    getCountFromServer(collection(firestore, "teachers")).then(resp => { setTeachersCount(resp.data().count) });
    getCountFromServer(collection(firestore, "students")).then(resp => { setStudentsCount(resp.data().count) });
    getCountFromServer(collection(firestore, "communities")).then(resp => { setCommunitiesCount(resp.data().count) });

    return () => unsubscribeConnections();
  }, []);

  useEffect(() => {
    console.log([connectionsCount, teachersCount, studentsCount, communitiesCount])
    setCounts({
      connections: connectionsCount,
      teachers: teachersCount,
      students: studentsCount,
      communities: communitiesCount,
    });
  }, [connectionsCount, teachersCount, studentsCount, communitiesCount]);

  return counts;
};

const Metrics = () => {
  const counts = useMetricsCounts();

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner}/>

      <Text style={styles.defaultText}>Nós já:</Text>

      <Text style={styles.defaultText}>
        {`\u2022`} Cadastramos{' '}
        <Text style={styles.boldUnderlinedText}>{counts.students}</Text>{' '}
        <Text style={styles.boldText}>alunos</Text> e{' '}
        <Text style={styles.boldUnderlinedText}>{counts.teachers}</Text>{' '}
        <Text style={styles.boldText}>professores</Text>.
      </Text>
      <Text style={styles.defaultText}>
        {`\u2022`} Construímos{' '}
        <Text style={styles.boldUnderlinedText}>{counts.communities}</Text>{' '}
        <Text style={styles.boldText}>comunidades</Text>.
      </Text>
      <Text style={styles.defaultText}>
        {`\u2022`} Conectamos{' '}
        <Text style={styles.boldUnderlinedText}>mais de {counts.connections}</Text>{' '}
        <Text style={styles.boldText}>pessoas</Text>.
      </Text>
    </View>
  );
};
export default Metrics;