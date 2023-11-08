import { StyleSheet } from "react-native";
import * as Colors from '../../styles/colors.js';

const styles = StyleSheet.create({
  container: {
    paddingTop: 160
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  text: {
    color: Colors.TEXT_BASE,
    fontSize: 16,
    lineHeight: 20,
    marginTop: 20,
  },
});

export default styles;