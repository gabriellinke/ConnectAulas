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
  
  textCreateButton: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.TEXT_IN_PURPLE_BASE,
  }
})

export default styles;