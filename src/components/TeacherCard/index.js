import React, { useState, useEffect } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { doc, getDoc, updateDoc, onSnapshot, increment, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuth, useFirestore } from 'reactfire';

import Button from '../Button';
import styles from './styles';


const toggleFavoriteTeacher = async (firestore, studentUid, teacherUid) => {
  try {
    const studentDocRef = doc(firestore, `students/${studentUid}`);
    const teacherDocRef = doc(firestore, `teachers/${teacherUid}`);

    const studentDoc = await getDoc(studentDocRef);
    const studentData = studentDoc.data();
    const currentFavorites = studentData?.favoriteTeachers || [];

    const isFavorite = currentFavorites.some(ref => ref.id === teacherUid);

    await updateDoc(studentDocRef, {
      favoriteTeachers: isFavorite 
        ? arrayRemove(teacherDocRef) 
        : arrayUnion(teacherDocRef)
    });

    console.log(`Toggled teacher ${teacherUid} in student ${studentUid}'s favorites.`);
  } catch (error) {
    console.error("Error toggling favorite teacher: ", error);
  }
};

const useIsTeacherFavorited = (studentUid, teacherUid) => {
  const firestore = useFirestore();

  const [isFavorited, setIsFavorited] = useState(false);
  const studentDocRef = doc(firestore, `students/${studentUid}`);

  useEffect(() => {
    const unsubscribe = onSnapshot(studentDocRef, (doc) => {
      const studentData = doc.data();
      const favoriteTeachers = studentData?.favoriteTeachers || [];

      const favorited = favoriteTeachers.some(ref => ref.id === teacherUid);
      setIsFavorited(favorited);
    }, (error) => {
      console.error("Error listening to favorite status: ", error);
    });

    return () => unsubscribe();
  }, [studentUid, teacherUid]);

  return isFavorited;
};

const TeacherCard = ({ id, name, subject, biography, hourlyRate, photoUrl, phoneNumber, availableTimes, enableQuizButton = false }) => {
  const firestore = useFirestore();
  const auth = useAuth();

  const studentId = (auth.currentUser || {}).uid;
  const isFavorited = useIsTeacherFavorited(studentId, id);

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

    Linking.openURL(`whatsapp://send?phone=${phoneNumber}`)
  }

  const handleToggleFavorite = async () => {
    await toggleFavoriteTeacher(firestore, studentId, id);
  }

  const openQuiz = () => {
    router.push(`Quiz/${id}`);
  }

  return (
      <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          style={styles.avatar}
          source={{uri: photoUrl}}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subject}>{subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{biography}</Text>

      <View style={styles.availableTimes}>
        <Text style={styles.scheduleTitle}>Horários</Text>
        {
          availableTimes.map((time, index) => (
            <Text style={styles.scheduleItem} key={index}>{`${time.weekDay} - ${time.startTime} às ${time.endTime}`}</Text>
          ))
        }
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ {hourlyRate}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton 
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton, 
              isFavorited ? styles.favorited : {},
            ]}
          >
            { isFavorited 
              ? <Ionicons name="ios-heart-dislike-outline" size={24} color="white" />
              : <Ionicons name="ios-heart-outline" size={24} color="white" />
            }
          </RectButton>

          <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
            <MaterialCommunityIcons name="whatsapp" size={24} color="white" />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
      {enableQuizButton && (
        <View style={styles.quizButtonContainer}>
          <Button 
            text='Responder quiz'
            type='purple'
            height={45}
            width={'100%'}
            onPress={openQuiz}
          />
        </View>
      )}
    </View>   
  )
}

export default TeacherCard;
