import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Button from '../Button'
import styles from './styles';
import RadioButtonGroup from '../RadioButtonGroup';

const QuizCardAdmin = ({ title, text, subject, choices, answer, deleteCallback }) => {
    const [userOption, setUserOption] = useState(answer);

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
                        locked={true}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        type='red'
                        text='Excluir questão'
                        height={56}
                        width={'100%'}
                        onPress={deleteCallback}
                    />
                </View>
            </View>
        </View>
    )
}

export default QuizCardAdmin;
