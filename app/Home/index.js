import { useState } from "react";
import { View, Image, Text } from "react-native";
import landingImg from '../../src/assets/home_image.png';
import studyIcon from '../../src/assets/study_icon.png';
import giveClassesIcon from '../../src/assets/give_classes_icon.png';
import heartIcon from '../../src/assets/connections_heart_icon.png';
import styles from './styles';
import { Link } from 'expo-router';

const Home = () => {
  const [conections, setConections] = useState(285); 
  return (
    <View style={styles.container}>
        <Image source={landingImg} style={styles.banner}/>

        <Text style={styles.title}>
            Seja bem vindo, {'\n'}
            <Text style={styles.titleBold}>
                O que deseja fazer?
            </Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <Link href={{ pathname: 'Example' }} style={[styles.button, styles.buttonPrimary]}>
            <View style={styles.buttonLayout}>
              <Image source={studyIcon}/>
              <Text style={styles.buttonText}>Estudar</Text>
            </View>
          </Link>
            <Link href={{ pathname: 'Example' }} style={[styles.button, styles.buttonSecondary]}>
              <View style={styles.buttonLayout}>
                <Image source={giveClassesIcon}/>
                <Text style={styles.buttonText}>Dar aulas</Text>
              </View>
            </Link>
        </View>

        <Text style={styles.totalConnections}>
            Total de {conections} conexões já realizadas {' '}
            <Image source={heartIcon}/>
        </Text>
        <Link href={{ pathname: 'Metrics' }} style={styles.linkAppInfo}>Veja mais</Link>
    </View>
  );
};
export default Home;