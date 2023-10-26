import React from 'react';
import { TouchableOpacity, Text } from "react-native";
import styles from './styles';
import * as Colors from '../../styles/colors'

export default Button = ({
  type = 'green', //options = 'green', 'purple' and 'red'
  width = 200,
  height = 56,
  text = 'Button',
  onPress = () => {},
  ...rest
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonStyle,
        {
          width: width,
          height: height
        },
        type === 'green' ?
        {
          backgroundColor: Colors.GREEN,
        } : type === 'purple' ?
        {
          backgroundColor: Colors.ANOTHER_PURPLE,
        } : 
        {
          backgroundColor: Colors.RED,
        }
      ]}>
      <Text style={styles.buttonText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};