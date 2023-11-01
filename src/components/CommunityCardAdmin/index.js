import React from 'react';
import { View, Text } from 'react-native';
import Button from '../Button'
import styles from './styles';

const CommunityCardAdmin = ({ name, subject, description, externalUrl, deleteCallback }) => {

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.titleAndSubjectContainer}>
                    <View style={styles.titleAndSubject}>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.subject}>{subject}</Text>
                    </View>
                </View>

                <Text style={styles.text}>{description}</Text>
            </View>
            <View style={styles.footer}>
                <Button
                    type='red'
                    text='Excluir questão'
                    height={56}
                    width={'100%'}
                    onPress={deleteCallback}
                />
            </View>
        </View>
    )
}

export default CommunityCardAdmin;
