import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './styles';
import * as Colors from '../../styles/colors'

export default RadioButtonGroup = ({
  userOption = null,
  setUserOption = () => {},
  choices = [],
  answer = 0,
  answered = true,
  locked = false,
}) => {

  const selectHandler = (value) => {
    if(!locked) {
      setUserOption(value);
    }
  };

  const correctAnswer = (index) => {
    return index === answer;
  }

  return (
    <View style={styles.container}>
      {choices.map((item, index) => {
        return (
          <Pressable
            style={[styles.option, {marginBottom: 12}]}
            onPress={() => selectHandler(index)}
            key={index}
          >
            <View style={[styles.circle, (index == userOption && answered) && {borderColor: correctAnswer(index) ? Colors.GREEN : Colors.RED}]}>
              {index == userOption && (
                <View style={[styles.insideCircle, answered && {backgroundColor: correctAnswer(index) ? Colors.GREEN : Colors.RED}]} />
              )}
            </View>
            <Text key={index} style={[styles.option, (index == userOption && answered) && {color: correctAnswer(index) ? Colors.GREEN : Colors.RED}]}> {item}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}