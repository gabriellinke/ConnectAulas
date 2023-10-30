import { StyleSheet } from "react-native";
import * as Colors from '../../styles/colors.js';

const styles = StyleSheet.create({
  container: {
    padding: 40,
    paddingTop: 0,
    backgroundColor: Colors.PURPLE,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  title: {
    // fontFamily: 'Archivo_700Bold',
    color: Colors.TEXT_IN_PURPLE_TITULO,
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 160,
    marginTop: 20,
    marginBottom: 40,
  },
});

export default styles;