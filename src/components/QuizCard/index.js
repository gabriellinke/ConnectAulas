import React from 'react';
import { View, Text } from 'react-native';
import Button from '../Button'
import styles from './styles';

const QuizCard = ({ title, text, subject, choices, answer, deleteCallback }) => {

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
                    <Text style={styles.choices}>alternativa</Text>
                    <Text style={styles.choices}>alternativa</Text>
                    <Text style={styles.choices}>alternativa</Text>
                    <Text style={styles.choices}>alternativa</Text>
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

export default QuizCard;
