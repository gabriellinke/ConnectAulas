import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import * as Colors from '../../../src/styles/colors.js'
import { Stack, router } from "expo-router";
import { doc, deleteDoc, updateDoc, onSnapshot, arrayRemove, Timestamp } from 'firebase/firestore';
import { useAuth, useFirestore } from 'reactfire';

import HeaderTitle from '../../../src/components/HeaderTitle';
import QuizCard from '../../../src/components/QuizCardAdmin';
import NoRecords from '../../../src/components/NoRecords/index.js';

import styles from '../styles';

const useRecentTeacherQuestions = (teacherId) => {
  const firestore = useFirestore();
  const [recentQuestions, setRecentQuestions] = useState([]);

  useEffect(() => {
    const teacherDocRef = doc(firestore, `teachers/${teacherId}`);
    let questionUnsubscribeFunctions = [];

    const updateQuestionListeners = (questionRefs) => {
      questionUnsubscribeFunctions.forEach(unsubscribe => unsubscribe());
      questionUnsubscribeFunctions = [];

      questionRefs.forEach(ref => {
        const unsubscribe = onSnapshot(ref, (questionDoc) => {
          if (questionDoc.exists()) {
            const questionData = questionDoc.data();
            const currentTime = Timestamp.now();
            const twentyFourHoursAgo = new Timestamp(currentTime.seconds - 86400, currentTime.nanoseconds);

            if (questionData.createdAt && questionData.createdAt.toDate() > twentyFourHoursAgo.toDate()) {
              setRecentQuestions(prevQuestions => {
                const existingIndex = prevQuestions.findIndex(q => q.id === questionDoc.id);
                if (existingIndex > -1) {
                  return prevQuestions.map((q, index) => index === existingIndex ? { id: questionDoc.id, ...questionData } : q);
                } else {
                  return [...prevQuestions, { id: questionDoc.id, ...questionData }];
                }
              });
            } else {
              setRecentQuestions(prevQuestions => prevQuestions.filter(q => q.id !== questionDoc.id));
            }
          } else {
            setRecentQuestions(prevQuestions => prevQuestions.filter(q => q.id !== questionDoc.id));
          }
        });

        questionUnsubscribeFunctions.push(unsubscribe);
      });
    };

    const teacherUnsubscribe = onSnapshot(teacherDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const teacherData = docSnapshot.data();
        const questionRefs = teacherData?.questions || [];
        updateQuestionListeners(questionRefs);
      }
    });

    return () => {
      questionUnsubscribeFunctions.forEach(unsubscribe => unsubscribe());
      teacherUnsubscribe();
    };
  }, [teacherId]);

  return recentQuestions;
};

const Quiz = () => {
  const auth = useAuth();
  const firestore = useFirestore();

  const teacherId = auth.currentUser.uid;
  const quizzes = useRecentTeacherQuestions(teacherId);

  const deleteQuiz = async (id) => {
    try {
      const quizDocRef = doc(firestore, `questions/${id}`);
  
      await deleteDoc(quizDocRef);
  
      const teacherDocRef = doc(firestore, `teachers/${teacherId}`);
  
      await updateDoc(teacherDocRef, {
        questions: arrayRemove(quizDocRef),
      });
  
      console.log(`Quiz ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting quiz: ", error);
      throw error;
    }
  };

  const CreateButton = () => {
    return (
      <TouchableOpacity style={styles.createButtonContainer} onPress={() => router.push('CreateQuiz')}>
        <Ionicons name={'md-add'} size={32} color={Colors.TEXT_IN_PURPLE_BASE}/>
        <Text style={styles.textCreateButton}>
          Criar
        </Text>
      </TouchableOpacity>)
  }

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
          headerRight: () => <CreateButton />,
          headerLeft: () => <LogoutButton />,
        }}
      />
      <HeaderTitle title="Meus Quizzes" />

      <ScrollView
        style={styles.list}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {quizzes.length > 0 ? (
          quizzes.map((quiz, index) => {
            return (
              <QuizCard
                title={quiz.title}
                subject={quiz.subject}
                text={quiz.text}
                choices={quiz.choices}
                answer={quiz.answer}
                deleteCallback={() => deleteQuiz(quiz.id)}
                key={index}
              />
            )
          })
          ) : (
            <NoRecords text={'Nenhum quiz cadastrado'} />
          )
        }
      </ScrollView>
    </View>
  )
}

export default Quiz;