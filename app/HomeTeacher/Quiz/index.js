import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';

import HeaderTitle from '../../../src/components/HeaderTitle';
import QuizCard from '../../../src/components/QuizCard';

import styles from '../styles';

const Quiz = () => {
  const [quizes, setQuizes] = useState([]);

  useEffect(() => {
    //TODO: Get teacher quizes from firebase
    setQuizes([
      {
        id: 1,
        title: "Título da questão",
        subject: "Conteúdo",
        text: "Essa é uma questão que poderia estar no quiz de algum professor. Abaixo está o enunciado mais detalhado. Aqui ensinamos a ver e a olhar e a ver várias situações. Ao participar desse grupo, você concede direito de uso infinito e explorativo de toda a sua vida, além de concordar com possíveis participações na TV japonesa.",
        choices: ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"],
        answer: "A",
      },
      {
        id: 2,
        title: "Título da questão 2",
        subject: "Conteúdo diferente",
        text: "Essa é uma questão que poderia estar no quiz de algum professor. Abaixo está o enunciado mais detalhado. Aqui ensinamos a ver e a olhar e a ver várias situações. Ao participar desse grupo, você concede direito de uso infinito e explorativo de toda a sua vida, além de concordar com possíveis participações na TV japonesa.",
        choices: ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"],
        answer: "D",
      }
    ])
  }, [])

  const deleteQuiz = (id) => {
    // TODO: delete quiz
    console.log("Delete id: ", id);
  }

  return (
    <View style={styles.container}>
      <HeaderTitle title="Meus Quizes" />

      <ScrollView
        style={styles.list}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {quizes.length > 0 ? (
          quizes.map((quiz, index) => {
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
            <Text>Nenhum quiz cadastrado</Text>
          )
        }
      </ScrollView>
    </View>
  )
}

export default Quiz;