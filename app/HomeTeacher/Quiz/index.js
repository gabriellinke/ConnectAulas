import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import * as Colors from '../../../src/styles/colors.js'
import { Stack, router } from "expo-router";

import HeaderTitle from '../../../src/components/HeaderTitle';
import QuizCard from '../../../src/components/QuizCardAdmin';
import NoRecords from '../../../src/components/NoRecords/index.js';

import styles from '../styles';
import { useAuth } from 'reactfire';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const auth = useAuth();

  useEffect(() => {
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
  }, [])

  const deleteQuiz = (id) => {
    // TODO: delete quiz from firebase
    console.log("Delete id: ", id);
  }

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