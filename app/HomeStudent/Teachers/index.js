import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import * as Colors from '../../../src/styles/colors.js'
import { Stack, router } from "expo-router";
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useAuth, useFirestore } from 'reactfire';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import HeaderTitle from '../../../src/components/HeaderTitle/index.js';
import TeacherCard from '../../../src/components/TeacherCard/index.js';
import CustomPicker from '../../../src/components/CustomPicker/index.js';
import Input from '../../../src/components/Input/index.js';
import NoRecords from '../../../src/components/NoRecords/index.js';

import styles from '../styles';

const useFetchTeachers = (subject, weekDay, startTime) => {
  const [teachers, setTeachers] = useState([]);
  const firestore = useFirestore();

  const isTimeInRange = (startTime, endTime, targetTime) => {
    const start = convertTimeToMinutes(startTime);
    const end = convertTimeToMinutes(endTime);
    const target = convertTimeToMinutes(targetTime);
    return target >= start && target <= end;
  };
  
  const convertTimeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  useEffect(() => {
    const teachersCollection = collection(firestore, "teachers");
    let teachersQuery = teachersCollection;

    if (subject) {
      teachersQuery = query(teachersCollection, where("subject", "==", subject));
    }

    const unsubscribe = onSnapshot(teachersQuery, (querySnapshot) => {
      const fetchedTeachers = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const filteredTeachers = fetchedTeachers.filter(teacher => 
        teacher.availableTimes.some(time => 
          ((weekDay != null && time.weekDay === weekDay) || (weekDay == null))
          && ((startTime !== "" && isTimeInRange(time.startTime, time.endTime, startTime)) || startTime === "")
        )
      );

      setTeachers(filteredTeachers);
    }, (error) => {
      console.error("Error fetching teachers: ", error);
    });

    return () => unsubscribe();
  }, [subject, weekDay, startTime]);

  return teachers;
};

const Teacher = () => {
  const auth = useAuth();

  const [areFiltersVisible, setAreFiltersVisible] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const weekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedWeekDay, setSelectedWeekDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const [filterSubject, setFilterSubject] = useState(null);
  const [filterWeekDay, setFilterWeekDay] = useState(null);
  const [filterTime, setFilterTime] = useState('');

  const teachers = useFetchTeachers(filterSubject, filterWeekDay, filterTime);

  useEffect(() => {
    setSubjects(["Matemática", "História", "Geografia", "Português", "Biologia", "Física", "Química", "Artes", "Educação Física", "Inglês", "Filosofia", "Sociologia"]);
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

    setFilterSubject(selectedSubject);
    setFilterWeekDay(selectedWeekDay);
    setFilterTime(selectedTime);
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
                  value={selectedTime}
                  setValue={setSelectedTime}
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
        {teachers.length > 0 ? (
          teachers.map((teacher, index) => {
            console.log(teacher.photoUrl);
            return (
              <TeacherCard
                id={teacher.id}
                name={teacher.name}
                subject={teacher.subject}
                biography={teacher.biography}
                hourlyRate={teacher.hourlyRate}
                photoUrl={teacher.photoUrl}
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