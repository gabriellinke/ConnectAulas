import { StyleSheet } from "react-native";
import * as Colors from '../../src/styles/colors.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },

  list: {
    marginTop: -40,
  },

  createButtonContainer: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    paddingRight: 16
  },

  logoutButtonContainer: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    paddingLeft: 16,
  },
  
  textCreateButton: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.TEXT_IN_PURPLE_BASE,
  },

  searchForm: {
    marginBottom: 24,
  },

  label: {
    color: Colors.TEXT_IN_PURPLE_BASE,
    // fontFamily: 'Poppins_400Regular'
  },

  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  inputBlock: {
    width: '48%',
  },

  input: {
    height: 54,
    backgroundColor: Colors.SHAPES_01,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },

  submitButton: {
    backgroundColor: Colors.GREEN,
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitButtonText: {
    color: Colors.SHAPES_01,
    // fontFamily: 'Archivo_700Bold',
    fontWeight: '700',
    fontSize: 16
  },

  filterButton: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.ANOTHER_PURPLE,
    paddingBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  filterText: {
    fontSize: 16,
    lineHeight: 19,
    color: Colors.TEXT_IN_PURPLE_BASE,
  }
})

export default styles;