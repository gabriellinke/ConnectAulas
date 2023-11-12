import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { useFirestore } from 'reactfire';

import HeaderTitle from '../../src/components/HeaderTitle';
import QuizCard from '../../src/components/QuizCard';

import styles from './styles';

const useRecentTeacherQuestions = (teacherUid) => {
  const firestore = useFirestore();
  const [recentQuestions, setRecentQuestions] = useState([]);

  useEffect(() => {
    const teacherDocRef = doc(firestore, `teachers/${teacherUid}`);
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
  }, [teacherUid]);

  return recentQuestions;
};

const useTeacherName = (teacherUid) => {
  const firestore = useFirestore();
  const [teacherName, setTeacherName] = useState('');

  useEffect(() => {
    const teacherDocRef = doc(firestore, `teachers/${teacherUid}`);

    getDoc(teacherDocRef).then((doc) => {
      if (doc.exists()) {
        const teacherData = doc.data();
        setTeacherName(teacherData.name);
      } else {
        console.log('No such teacher!');
      }
    }).catch((error) => {
      console.error("Error fetching teacher's name: ", error);
    });
  }, [teacherUid]);

  return teacherName;
};

const Quiz = () => {
  const { id } = useLocalSearchParams();

  const quizzes = useRecentTeacherQuestions(id);
  const teacherName = useTeacherName(id);

  return (
    <View style={styles.container}>
      <HeaderTitle title={`Quiz do professor ${teacherName}`} />

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
            // TODO: Create something better
            <Text>Nenhum quiz cadastrado</Text>
          )
        }
      </ScrollView>
    </View>
  )
}

export default Quiz;