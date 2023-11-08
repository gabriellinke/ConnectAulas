import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import * as Colors from '../../../src/styles/colors.js'
import { Stack, router } from "expo-router";
import { Feather, MaterialIcons } from '@expo/vector-icons';

import HeaderTitle from '../../../src/components/HeaderTitle/index.js';
import TeacherCard from '../../../src/components/TeacherCard/index.js';
import CustomPicker from '../../../src/components/CustomPicker/index.js';
import Input from '../../../src/components/Input/index.js';
import NoRecords from '../../../src/components/NoRecords/index.js';

import styles from '../styles';
import { useAuth } from 'reactfire';

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [visibleTeachers, setVisibleTeachers] = useState([]);
  const auth = useAuth();

  const [areFiltersVisible, setAreFiltersVisible] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(-1);
  const weekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  const [selectedWeekDay, setSelectedWeekDay] = useState();
  const [filterTime, setFilterTime] = useState('');

  useEffect(() => {
    //TODO: Get teacher from firebase
    const allTeachers = [
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
    ]

    setTeachers(allTeachers)
    setVisibleTeachers(allTeachers)

    //TODO: Get all subjects from firebase
    setSubjects(["Matemática", "História", "Geografia", "Código penal"]);
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

  function handleToggleFiltersVisible() {
    setAreFiltersVisible(!areFiltersVisible);
  }

  async function handleFiltersSubmit() {
    setAreFiltersVisible(false);

    const subject = selectedSubject;
    const weekDay = selectedWeekDay;

    let filteredTeachers = teachers;
    if(subject) {
      filteredTeachers = filteredTeachers.filter(teacher => teacher.subject === subject);
    }
    if(weekDay) {
      filteredTeachers = filteredTeachers.filter(teacher => {
        return teacher.availableTimes.some(time => time.weekDay === weekDay);
      });
    }
    if(filterTime !== '') {
      filteredTeachers = filteredTeachers.filter(teacher => {
        return teacher.availableTimes.some(time => time.startTime === filterTime);
      });
    }

    setVisibleTeachers(filteredTeachers);
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
      <HeaderTitle title="Professores Disponíveis">
      <RectButton onPress={handleToggleFiltersVisible} style={{marginBottom: 16}}>
          <View style={styles.filterButton}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Feather name="filter" size={20} color={Colors.GREEN} style={{marginRight: 16}} />
              <Text style={styles.filterText}>Filtrar por matéria</Text>
            </View>
              {areFiltersVisible ? (
                <MaterialIcons name="keyboard-arrow-up" size={20} color={Colors.ANOTHER_PURPLE} />
              ): (
                <MaterialIcons name="keyboard-arrow-down" size={20} color={Colors.ANOTHER_PURPLE} />
              )}
          </View> 
        </RectButton>
        { areFiltersVisible && (
          <View style={styles.searchForm}>
            <CustomPicker 
              label="Matéria"
              options={subjects}
              value={selectedSubject}
              setValue={setSelectedSubject}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <CustomPicker
                  label="Dia da semana"
                  options={weekDays}
                  value={selectedWeekDay}
                  setValue={setSelectedWeekDay}
                />
              </View>

              <View style={styles.inputBlock}>
                <Input
                  label='Horário de início'
                  placeholder="Qual horário?"
                  value={filterTime}
                  setValue={setFilterTime}
                  maskType='schedule'
                />
              </View>
            </View>

            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
          )
        }  
      </HeaderTitle>

      <ScrollView
        style={styles.list}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {visibleTeachers.length > 0 ? (
          visibleTeachers.map((teacher, index) => {
            return (
              <TeacherCard
                name={teacher.name}
                subject={teacher.subject}
                biography={teacher.biography}
                hourlyRate={teacher.hourlyRate}
                imageUrl={teacher.imageUrl}
                phoneNumber={teacher.phoneNumber}
                availableTimes={teacher.availableTimes}
                key={index}
              />
            )
          })
          ) : (
            <NoRecords text={'Nenhum professor disponível'} />
          )
        }
      </ScrollView>
    </View>
  )
}

export default Teacher;