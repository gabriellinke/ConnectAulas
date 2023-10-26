import { StyleSheet } from 'react-native';
import * as Colors from '../../styles/colors'

export default styles = StyleSheet.create({
    buttonStyle: {
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 10,
        color: Colors.SHAPES_01,
    },
    buttonText: {
        color: Colors.SHAPES_01,
        textAlign: 'center',
        // font-family: Archivo,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 26, /* 162.5% */
    },
  });