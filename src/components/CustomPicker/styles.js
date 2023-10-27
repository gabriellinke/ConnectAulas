import { StyleSheet } from 'react-native';
import * as Colors from '../../styles/colors'

const styles = StyleSheet.create({
    pickerWrapper: {
        justifyContent: 'center',
        fontSize: 16,
        backgroundColor: Colors.SHAPES_02,
        borderRadius: 8,
        width: '100%',
        height: '80vh',
        marginTop: 4,
        marginBottom: 16,
    },
    label: {
        // fontFamily: Poppins,
        color: Colors.TEXT_IN_PURPLE_BASE,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 22,
    },
  });
  
  export default styles;