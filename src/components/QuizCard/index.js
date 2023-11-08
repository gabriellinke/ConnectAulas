import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Button from '../Button'
import styles from './styles';
import RadioButtonGroup from '../RadioButtonGroup';
import { Audio } from 'expo-av';

const QuizCardAdmin = ({ title, text, subject, choices, answer }) => {
    const [userOption, setUserOption] = useState(null);
    const [locked, setLocked] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [sound, setSound] = useState();

    const checkQuestion = () => {
        setAnswered(true);
        if(userOption === answer)
            playCorrectAnswerSound();
        else
            playWrongAnswerSound();

        // Travar questão??
        setLocked(false);
    }

    useEffect(() => {
        // Se não travar questão atualizar o estado de answered
        setAnswered(false);
    }, [userOption])

    async function playCorrectAnswerSound() {
        const { sound } = await Audio.Sound.createAsync(require('../../sound/correct-answer.mp3'));
        setSound(sound);
        await sound.playAsync();
    }

    async function playWrongAnswerSound() {
        const { sound } = await Audio.Sound.createAsync(require('../../sound/wrong-answer.mp3'));
        setSound(sound);
        await sound.playAsync();
    }
    
    useEffect(() => {
        return sound
          ? () => {
              sound.unloadAsync();
            }
          : undefined;
      }, [sound]);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.titleAndSubjectContainer}>
                    <View style={styles.titleAndSubject}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subject}>{subject}</Text>
                    </View>
                </View>

                <Text style={styles.text}>{text}</Text>

                <View style={styles.choicesContainer}>
                    <RadioButtonGroup
                        userOption={userOption}
                        setUserOption={setUserOption}
                        choices={choices}
                        answer={answer}
                        answered={answered}
                        locked={locked}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        type='purple'
                        text='Responder'
                        height={56}
                        width={'100%'}
                        onPress={checkQuestion}
                    />
                </View>
            </View>
        </View>
    )
}

export default QuizCardAdmin;
