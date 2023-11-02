import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import * as Colors from '../../../src/styles/colors.js'
import { Stack, router } from "expo-router";

import HeaderTitle from '../../../src/components/HeaderTitle/index.js';
import TeacherCard from '../../../src/components/TeacherCard/index.js';

import styles from '../styles';
import { useAuth } from 'reactfire';

const Favorites = () => {
  const [teachers, setTeachers] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    //TODO: Get teacher from firebase
    setTeachers([
      {
        id: 1,
        name: "Gabriel Linke",
        subject: "Matemática",
        biography: "Essa é uma questão que poderia estar no quiz de algum professor. Abaixo está o enunciado mais detalhado. Aqui ensinamos a ver e a olhar e a ver várias situações. Ao participar desse grupo, você concede direito de uso infinito e explorativo de toda a sua vida, além de concordar com possíveis participações na TV japonesa.",
        hourlyRate: '50',
        imageUrl: 'https://avatars.githubusercontent.com/u/51447706?v=4',
        phoneNumber: '49988607303',
        availableTimes: [
          {
            weekDay: 'Segunda-feira',
            startTime: '08:00',
            endTime: '10:00'
          },
          {
            weekDay: 'Quarta-feira',
            startTime: '08:00',
            endTime: '10:00'
          },
          {
            weekDay: 'Sexta-feira',
            startTime: '08:00',
            endTime: '10:00'
          },
        ]
      },
      {
        id: 2,
        name: "Doutor Gilmar",
        subject: "Código penal",
        biography: "Essa é uma questão que poderia estar no quiz de algum professor. Abaixo está o enunciado mais detalhado. Aqui ensinamos a ver e a olhar e a ver várias situações. Ao participar desse grupo, você concede direito de uso infinito e explorativo de toda a sua vida, além de concordar com possíveis participações na TV japonesa.",
        hourlyRate: '200',
        imageUrl: 'https://pbs.twimg.com/profile_images/1481641726/Sem_t_tulo_400x400.jpg',
        phoneNumber: '49999861229',
        availableTimes: [
          {
            weekDay: 'Segunda-feira',
            startTime: '08:00',
            endTime: '10:00'
          },
          {
            weekDay: 'Quarta-feira',
            startTime: '08:00',
            endTime: '10:00'
          },
          {
            weekDay: 'Sexta-feira',
            startTime: '08:00',
            endTime: '10:00'
          },
        ]
      },
    ])
  }, [])

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
            // TODO: Create something better
            <Text>Nenhum professor disponível</Text>
          )
        }
      </ScrollView>
    </View>
  )
}

export default Favorites;