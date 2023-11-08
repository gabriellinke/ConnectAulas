import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import * as Colors from '../../styles/colors'

import styles from './styles';

const NoRecords = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FontAwesome5 name="clipboard" size={48} color={Colors.TEXT_BASE}/>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  )
}

export default NoRecords;