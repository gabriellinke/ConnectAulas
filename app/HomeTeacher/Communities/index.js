import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import * as Colors from '../../../src/styles/colors.js'
import { Stack, router } from "expo-router";
import { collection, doc, deleteDoc, updateDoc, query, where, onSnapshot, arrayRemove } from "firebase/firestore";
import { useAuth, useFirestore } from "reactfire";

import HeaderTitle from '../../../src/components/HeaderTitle';
import CommunityCard from '../../../src/components/CommunityCardAdmin';
import NoRecords from '../../../src/components/NoRecords/index.js';

import styles from '../styles';

const useCommunitiesByTeacher = (teacherId) => {
  const firestore = useFirestore();
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const communitiesCollectionRef = collection(firestore, "communities");
    const communitiesQuery = query(communitiesCollectionRef, where("teacherId", "==", teacherId));

    const unsubscribe = onSnapshot(communitiesQuery, (querySnapshot) => {
      const fetchedCommunities = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCommunities(fetchedCommunities);
    }, (error) => {
      console.error("Error fetching communities: ", error);
    });

    return () => unsubscribe();
  }, [teacherId]);

  return communities;
};

const Communities = () => {
  const auth = useAuth();
  const firestore = useFirestore();

  const teacherId = auth.currentUser.uid;
  const communities = useCommunitiesByTeacher(teacherId);

  const deleteCommunity = async (id) => {
    try {
      const communityDocRef = doc(firestore, `communities/${id}`);
  
      await deleteDoc(communityDocRef);
  
      const teacherDocRef = doc(firestore, `teachers/${teacherId}`);
  
      await updateDoc(teacherDocRef, {
        communities: arrayRemove(communityDocRef)
      });
  
      console.log(`Community ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting community: ", error);
      throw error;
    }
  };

  const CreateButton = () => {
    return (
      <TouchableOpacity style={styles.createButtonContainer} onPress={() => router.push('CreateCommunity')}>
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
      <HeaderTitle title="Minhas Comunidades" />

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
                deleteCallback={() => deleteCommunity(community.id)}
                key={index}
              />
            )
          })
          ) : (
            <NoRecords text={'Nenhuma comunidade cadastrada'} />
          )
        }
      </ScrollView>
    </View>
  )
}

export default Communities;