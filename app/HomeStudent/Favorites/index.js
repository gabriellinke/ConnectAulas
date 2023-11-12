import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import * as Colors from '../../../src/styles/colors.js'
import { Stack, router } from "expo-router";
import { useAuth, useFirestore } from 'reactfire';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

import HeaderTitle from '../../../src/components/HeaderTitle/index.js';
import TeacherCard from '../../../src/components/TeacherCard/index.js';
import NoRecords from '../../../src/components/NoRecords/index.js';

import styles from '../styles';

const useFavoriteTeachers = (studentUid) => {
  const firestore = useFirestore();
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);

  useEffect(() => {
    const studentDocRef = doc(firestore, `students/${studentUid}`);

    const fetchFavoriteTeachers = async (favoriteTeacherRefs) => {
      const teacherPromises = favoriteTeacherRefs.map(ref => getDoc(ref));
      const teacherDocs = await Promise.all(teacherPromises);
      const teachers = teacherDocs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFavoriteTeachers(teachers);
    };

    const unsubscribe = onSnapshot(studentDocRef, async (doc) => {
      const studentData = doc.data();
      const favoriteTeacherRefs = studentData?.favoriteTeachers || [];
      await fetchFavoriteTeachers(favoriteTeacherRefs);
    }, (error) => {
      console.error("Error fetching favorite teachers: ", error);
    });

    return () => unsubscribe();
  }, [studentUid]);

  return favoriteTeachers;
};

const Favorites = () => {
  const auth = useAuth();
  const teachers = useFavoriteTeachers(auth.currentUser.uid);

  const LogoutButton = () => {
    return (
      <TouchableOpacity style={styles.logoutButtonContainer} onPress={logout}>
        <Text style={styles.textCreateButton}>
          Logout
        </Text>
      </TouchableOpacity>)
  }

  const logout = () => {
    auth.signOut();
    router.push('Landing');
  }


  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: Colors.PURPLE,
          },
          headerTintColor: Colors.TEXT_IN_PURPLE_BASE,
          headerShadowVisible: false,
          title: '',
          headerLeft: () => <LogoutButton />,
        }}
      />
      <HeaderTitle title="Meus Professores Favoritos" />

      <ScrollView
        style={styles.list}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.length > 0 ? (
          teachers.map((teacher, index) => {
            return (
              <TeacherCard
                id={teacher.id}
                name={teacher.name}
                subject={teacher.subject}
                biography={teacher.biography}
                hourlyRate={teacher.hourlyRate}
                imageUrl={teacher.imageUrl}
                phoneNumber={teacher.phoneNumber}
                availableTimes={teacher.availableTimes}
                enableQuizButton
                key={index}
              />
            )
          })
          ) : (
            <NoRecords text={'Nenhum professor favoritado'} />
          )
        }
      </ScrollView>
    </View>
  )
}

export default Favorites;