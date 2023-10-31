import { StyleSheet } from "react-native";
import * as Colors from '../../styles/colors.js';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SHAPES_01,
    borderWidth: 1,
    borderColor: Colors.LINES_IN_WHITE,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden'
  },

  titleAndSubjectContainer: {
    paddingVertical: 24,
  },

  title: {
    // fontFamily: 'Archivo_700Bold',
    color: Colors.TEXT_TITULOS,
    fontSize: 20,
    fontWeight: '700',
  },

  subject: {
    // fontFamily: 'Poppins_400Regular',
    color: Colors.TEXT_BASE,
    fontSize: 12,
    marginTop: 4
  },

  text: {
    // fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: Colors.TEXT_BASE,
  },

  content: {
    marginHorizontal: 24,
  },

  choicesContainer: {
    paddingVertical: 24,
  },

  choices: {
    fontSize: 14,
    lineHeight: 24,
    color: Colors.TEXT_BASE,
  },

  button: {
    paddingBottom: 24,
  }
});

export default styles;