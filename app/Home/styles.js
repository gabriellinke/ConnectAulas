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

    title: {
        // fontFamily: 'Poppins_400Regular',
        color: Colors.SHAPES_01,
        fontSize: 20,
        lineHeight: 30,
        marginTop: 20,
    },

    titleBold: {
        // fontFamily: 'Poppins_600SemiBold',
        fontWeight: '600',
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between',
    },

    button: {
        height: 150,
        width: '48%',
        borderRadius: 8,
        padding: 24,
    },
    buttonLayout: {
        height: 150-24*2, //Gambiarra - height: 100% n tá funcionando do jeito q eu esperava
        width: '100%', // width: 100% também n está funcionando
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    buttonPrimary: {
        backgroundColor: Colors.ANOTHER_PURPLE
    },

    buttonSecondary: {
        backgroundColor: Colors.ANOTHER_GREEN
    }, 

    buttonText: {
        // fontFamily: 'Archivo_700Bold',
        color: Colors.TEXT_IN_PURPLE_TITULO,
        fontWeight: '700',
        fontSize: 20
    },

    totalConnections: {
        // fontFamily: 'Poppins_400Regular',
        color: Colors.TEXT_IN_PURPLE_BASE,
        fontSize: 12,
        lineHeight: 20,
        maxWidth: 140,
        marginTop: 40,
    },

    linkAppInfo: {
        color: Colors.TEXT_IN_PURPLE_BASE,
        fontSize: 12,
        lineHeight: 20,
        maxWidth: 140,
        fontWeight: '600',
        textDecorationLine: 'underline',
    }
  });
  
  export default styles;