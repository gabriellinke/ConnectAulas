import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';

import HeaderTitle from '../../../src/components/HeaderTitle';
import CommunityCard from '../../../src/components/CommunityCardAdmin';

import styles from '../styles';

const Communities = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    //TODO: Get teacher communities from firebase
    setCommunities([
      {
        id: 1,
        name: "Aulas de Código Penal",
        subject: "Professor Gilmar",
        description: "Comunidade para estudo do código penal, especialmente o artigo Jacaré.\n\n Aqui ensinamos a ver e a olhar e a ver várias situações. Ao participar desse grupo, você concede direito de uso infinito e explorativo de toda a sua vida, além de concordar com possíveis participações na TV japonesa.",
        externalUrl: "",
      },
      {
        id: 2,
        name: "Grupo de estudos",
        subject: "Matéria de Matemática",
        description: "Comunidade para estudo do código penal, especialmente o artigo Jacaré.\n\n Aqui ensinamos a ver e a olhar e a ver várias situações. Ao participar desse grupo, você concede direito de uso infinito e explorativo de toda a sua vida, além de concordar com possíveis participações na TV japonesa.",
        externalUrl: "",
      }
    ])
  }, [])

  const deleteCommunity = (id) => {
    // TODO: delete quiz from firebase
    console.log("Delete id: ", id);
  }

  return (
    <View style={styles.container}>
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
            // TODO: Create something better
            <Text>Nenhuma comunidade cadastrada</Text>
          )
        }
      </ScrollView>
    </View>
  )
}

export default Communities;