import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from "expo-router";

import HeaderTitle from '../../src/components/HeaderTitle';
import QuizCard from '../../src/components/QuizCard';

import styles from './styles';
const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [teacherName, setTeacherName] = useState('');
  const { id } = useLocalSearchParams();

  useEffect(() => {
    console.log("id ", id);

    //TODO: Get teacher quizzes from firebase
    setQuizzes([
      {
        id: 1,
        title: "Título da questão",
        subject: "Conteúdo",
        text: "Essa é uma questão que poderia estar no quiz de algum professor. Abaixo está o enunciado mais detalhado. Aqui ensinamos a ver e a olhar e a ver várias situações. Ao participar desse grupo, você concede direito de uso infinito e explorativo de toda a sua vida, além de concordar com possíveis participações na TV japonesa.",
        choices: ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"],
        answer: 0,
      },
      {
        id: 2,
        title: "Título da questão 2",
        subject: "Conteúdo diferente",
        text: "Essa é uma questão que poderia estar no quiz de algum professor. Abaixo está o enunciado mais detalhado. Aqui ensinamos a ver e a olhar e a ver várias situações. Ao participar desse grupo, você concede direito de uso infinito e explorativo de toda a sua vida, além de concordar com possíveis participações na TV japonesa.",
        choices: ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"],
        answer: 3,
      }
    ])

    // TODO: Get teacher name from firebase
    setTeacherName('Gabriel Linke');
  }, [])

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