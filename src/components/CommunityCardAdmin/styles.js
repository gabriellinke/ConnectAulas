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
    fontWeight: '700',
    color: Colors.TEXT_TITULOS,
    fontSize: 20,
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
    paddingBottom: 16,
  },

  footer: {
    borderTopColor: Colors.LINES_IN_WHITE,
    borderTopWidth: 1,
    backgroundColor: Colors.SHAPES_02,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});

export default styles;