import { StyleSheet } from 'react-native';
import * as Colors from '../../styles/colors'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
  },
  option: {
    fontSize: 14,
    lineHeight: 24,
    color: Colors.TEXT_BASE,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    display: 'flex', 
    justifyContent:'center', 
    alignItems: 'center',
    width: 16, 
    height: 16, 
    borderRadius: 16, 
    borderWidth: 1, 
    backgroundColor: Colors.BACKGROUND, 
    borderColor: Colors.ANOTHER_PURPLE, 
  },
  insideCircle: {
    width: 8, 
    height: 8, 
    borderRadius: 24, 
    backgroundColor: Colors.ANOTHER_PURPLE, 
  },
});
export default styles;