import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import * as Colors from '../../../src/styles/colors.js'
import { Stack, router } from "expo-router";
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useAuth, useFirestore } from 'reactfire';
import { collection, query, where, getDocs } from 'firebase/firestore';

import HeaderTitle from '../../../src/components/HeaderTitle';
import CommunityCard from '../../../src/components/CommunityCard';
import CustomPicker from '../../../src/components/CustomPicker/index.js';
import NoRecords from '../../../src/components/NoRecords/index.js';

import styles from '../styles';

const useCommunities = (subject) => {
  const firestore = useFirestore();
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const communitiesCollection = collection(firestore, "communities");
        let communitiesQuery;

        if (subject) {
          communitiesQuery = query(communitiesCollection, where("subject", "==", subject));
        } else {
          communitiesQuery = query(communitiesCollection);
        }

        const querySnapshot = await getDocs(communitiesQuery);
        const fetchedCommunities = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setCommunities(fetchedCommunities);
      } catch (error) {
        console.error("Error fetching communities: ", error);
      }
    };

    fetchCommunities();
  }, [subject]);

  return communities;
};

const Communities = () => {
  const [areFiltersVisible, setAreFiltersVisible] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [filterSubject, setFilterSubject] = useState(null);

  const auth = useAuth();
  const communities = useCommunities(filterSubject);

  useEffect(() => {
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
    setAreFiltersVisible(false);
    setFilterSubject(selectedSubject);
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
                value={selectedSubject}
                setValue={setSelectedSubject}
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
        {communities.length > 0 ? (
          communities.map((community, index) => {
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
            <NoRecords text={'Nenhuma comunidade encontrada'} />
          )
        }
      </ScrollView>
    </View>
  )
}

export default Communities;