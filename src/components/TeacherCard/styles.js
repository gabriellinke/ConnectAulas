import { StyleSheet } from "react-native";
import * as Colors from '../../styles/colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.TEXT_IN_PURPLE_TITULO,
    borderWidth: 1,
    borderColor: Colors.LINES_IN_WHITE,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden'
  },

  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#eee'
  },

  profileInfo: {
    marginLeft: 16,
  },

  name: {
    // fontFamily: 'Archivo_700Bold',
    color: Colors.TEXT_TITULOS,
    fontSize: 20,
  },

  subject: {
    // fontFamily: 'Poppins_400Regular',
    color: Colors.TEXT_BASE,
    fontSize: 12,
    marginTop: 4
  },

  bio: {
    marginHorizontal: 24,
    // fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: Colors.TEXT_BASE,
  },

  footer: {
    backgroundColor: Colors.SHAPES_02,
    padding: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.LINES_IN_WHITE,
  },

  availableTimes: {
    backgroundColor: Colors.SHAPES_02,
    paddingHorizontal: 24,
    paddingVertical: 8,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.LINES_IN_WHITE,
    marginTop: 24,
  },

  scheduleTitle: {
    textAlign: 'center',
    color: Colors.TEXT_BASE,
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '700',
  }, 

  scheduleItem: {
    color: Colors.TEXT_BASE,
    fontSize: 14,
    lineHeight: 24,
  }, 

  price: {
    // fontFamily: 'Poppins_400Regular',
    color: Colors.TEXT_BASE,
    fontSize: 14,
  },

  priceValue: {
    // fontFamily: 'Archivo_700Bold',
    color: Colors.PURPLE,
    fontSize: 16,
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },

  favoriteButton: {
    backgroundColor: Colors.PURPLE,
    width: 56,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  favorited: {
    backgroundColor: Colors.RED,
  },

  contactButton: {
    backgroundColor: Colors.GREEN,
    flex: 1,
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  contactButtonText: {
    color: Colors.TEXT_IN_PURPLE_TITULO,
    // fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    marginLeft: 16
  },
});

export default styles;