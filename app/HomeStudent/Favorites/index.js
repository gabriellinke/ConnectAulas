import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import * as Colors from '../../../src/styles/colors.js'
import { Stack, router } from "expo-router";

import HeaderTitle from '../../../src/components/HeaderTitle/index.js';
import QuizCard from '../../../src/components/QuizCardAdmin/index.js';

import styles from '../styles';
import { useAuth } from 'reactfire';

const Quiz = () => {
  const [quizes, setQuizes] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    //TODO: Get teacher quizes from firebase
    setQuizes([
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
  }, [])

  const deleteQuiz = (id) => {
    // TODO: delete quiz from firebase
    console.log("Delete id: ", id);
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
            // TODO: Create something better
            <Text>Nenhum quiz cadastrado</Text>
          )
        }
      </ScrollView>
    </View>
  )
}

export default Quiz;