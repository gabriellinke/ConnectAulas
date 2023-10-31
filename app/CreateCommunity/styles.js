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
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subtitle: {
        color: Colors.TEXT_IN_PURPLE_BASE,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
    },
    cameraContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
    },
    camera: {
        height: 240,
        width: 240,
    }
  });
  
  export default styles;