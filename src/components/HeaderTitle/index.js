import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const PageHeader = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {children}
    </View>
  )
}

export default PageHeader;