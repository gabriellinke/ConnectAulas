import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import styles from './styles';

const TeacherCard = ({ name, subject, biography, hourlyRate, imageUrl, phoneNumber, availableTimes }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleLinkToWhatsapp = () => {
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}`)
  }

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
  }

    return (
        <View style={styles.container}>
        <View style={styles.profile}>
          <Image 
            style={styles.avatar}
            source={{uri: imageUrl}}
          />
  
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.subject}>{subject}</Text>
          </View>
        </View>
  
        <Text style={styles.bio}>{biography}</Text>
  
        <View style={styles.availableTimes}>
          <Text style={styles.scheduleTitle}>Horários</Text>
          {
            availableTimes.map((time, index) => (
              <Text style={styles.scheduleItem} key={index}>{`${time.weekDay} - ${time.startTime} às ${time.endTime}`}</Text>
            ))
          }
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>
            Preço/hora {'   '}
            <Text style={styles.priceValue}>R$ {hourlyRate}</Text>
          </Text>
  
          <View style={styles.buttonsContainer}>
            <RectButton 
              onPress={handleToggleFavorite}
              style={[
                styles.favoriteButton, 
                isFavorited ? styles.favorited : {},
              ]}
            >
              { isFavorited 
                ? <Ionicons name="ios-heart-dislike-outline" size={24} color="white" />
                : <Ionicons name="ios-heart-outline" size={24} color="white" />
              }
            </RectButton>
  
            <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
              <MaterialCommunityIcons name="whatsapp" size={24} color="white" />
              <Text style={styles.contactButtonText}>Entrar em contato</Text>
            </RectButton>
          </View>
        </View>
      </View>   
    )
}

export default TeacherCard;
