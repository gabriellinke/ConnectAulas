import { StyleSheet } from 'react-native';
import * as Colors from '../../src/styles/colors'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PURPLE,
        // justifyContent: 'center',
        padding: 40,
    },
    banner: {
        width: '100%',
        resizeMode: 'contain',
    },
    defaultText: {
        // fontFamily: 'Poppins_400Regular',
        color: Colors.SHAPES_01,
        fontSize: 20,
        lineHeight: 30,
        marginTop: 20,
    },
    boldText: {
        color: Colors.SHAPES_01,
        fontSize: 20,
        lineHeight: 30,
        marginTop: 20,
        fontWeight: '600',
    },
    boldUnderlinedText: {
        color: Colors.SHAPES_01,
        fontSize: 20,
        lineHeight: 30,
        marginTop: 20,
        fontWeight: '600',
        textDecorationLine: 'underline',
    }
  });
  
  export default styles;