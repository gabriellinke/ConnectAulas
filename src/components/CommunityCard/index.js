import React from 'react';
import { View, Text, Linking } from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFirestore } from "reactfire";
import { doc, updateDoc, increment } from "firebase/firestore";

const CommunityCardAdmin = ({ name, subject, description, externalUrl }) => {
    const firestore = useFirestore();

    const handleLinkToWhatsapp = async () => {
        try {
            const connectionsMetricsRef = doc(firestore, "metrics/connections");

            await updateDoc(connectionsMetricsRef, {
              count: increment(1),
            });
        
            console.log("Connections count incremented successfully.");
        } catch (error) {
            console.error("Error incrementing connections count: ", error);
            throw error;
        }

        Linking.openURL(`${externalUrl}`)
    }    

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.titleAndSubjectContainer}>
                    <View style={styles.titleAndSubject}>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.subject}>{subject}</Text>
                    </View>
                </View>

                <Text style={styles.text}>{description}</Text>
            </View>
            <View style={styles.footer}>
                <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
                    <MaterialCommunityIcons name="whatsapp" size={24} color="white" />
                    <Text style={styles.contactButtonText}>Entrar em contato</Text>
                </RectButton>
            </View>
        </View>
    )
}

export default CommunityCardAdmin;
