import { StyleSheet } from 'react-native';
import * as Colors from '../../styles/colors'

const styles = StyleSheet.create({
    input: {
        height: 54,
        backgroundColor: Colors.SHAPES_02,
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 4,
        marginBottom: 16,
        fontSize: 16,
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