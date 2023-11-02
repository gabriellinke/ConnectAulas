import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import * as Colors from '../../../src/styles/colors.js'
import { Stack, router } from "expo-router";
import { Feather, MaterialIcons } from '@expo/vector-icons';

import HeaderTitle from '../../../src/components/HeaderTitle';
import CommunityCard from '../../../src/components/CommunityCard';
import CustomPicker from '../../../src/components/CustomPicker/index.js';

import styles from '../styles';
import { useAuth } from 'reactfire';

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const [visibleCommunities, setVisibleCommunities] = useState([]);
  const [areFiltersVisible, setAreFiltersVisible] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState();

  const auth = useAuth();

  useEffect(() => {
    //TODO: Get all communities from firebase
    const allCommunities = [
      {
        id: 1,
        name: "Aulas de Código Penal",
        subject: "Matemática",
        description: "Comunidade para estudo do código penal, especialmente o artigo Jacaré.\n\n Aqui ensinamos a ver e a olhar e a ver várias situações. Ao participar desse grupo, você concede direito de uso infinito e explorativo de toda a sua vida, além de concordar com possíveis participações na TV japonesa.",
        externalUrl: "",
      },
      {
        id: 2,
        name: "Grupo de estudos",
        subject: "Geografia",
        description: "Comunidade para estudo do código penal, especialmente o artigo Jacaré.\n\n Aqui ensinamos a ver e a olhar e a ver várias situações. Ao participar desse grupo, você concede direito de uso infinito e explorativo de toda a sua vida, além de concordar com possíveis participações na TV japonesa.",
        externalUrl: "",
      }
    ]

    setCommunities(allCommunities);
    setVisibleCommunities(allCommunities);

    //TODO: Get all subjects from firebase
    setSubjects(["Matemática", "História", "Geografia"]);
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
    const subject = subjects[selectedSubjectIndex];
    setAreFiltersVisible(false);
    if(subject === ''){
      setVisibleCommunities(communities);
      return;
    }
    setVisibleCommunities(communities.filter(community => community.subject === subject));
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
      <HeaderTitle title="Comunidades Disponíveis" >
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
                value={selectedSubjectIndex}
                setValue={setSelectedSubjectIndex}
              />
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
        {visibleCommunities.length > 0 ? (
          visibleCommunities.map((community, index) => {
            return (
              <CommunityCard
                name={community.name}
                subject={community.subject}
                description={community.description}
                externalUrl={community.externalUrl}
                key={index}
              />
            )
          })
          ) : (
            // TODO: Create something better
            <Text>Nenhuma comunidade cadastrada</Text>
          )
        }
      </ScrollView>
    </View>
  )
}

export default Communities;