import { StyleSheet } from 'react-native';
import * as Colors from '../../src/styles/colors'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PURPLE,
        // justifyContent: 'center',
        padding: 40,
        paddingTop: 0,
    },
    title: {
        // fontFamily: 'Archivo',
        color: Colors.TEXT_IN_PURPLE_TITULO,
        fontSize: 24,
        lineHeight: 29,
        fontWeight: '700',
    }
  });
  
  export default styles;