import { ms, ScaledSheet } from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B5D2EF',
    maxHeight: ms(400),
    borderRadius: ms(32),

  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: ms(16),
    marginVertical: ms(16),
  },
  viewMyPage: {
    marginTop: ms(10),
    marginHorizontal: ms(16),
    marginBottom: ms(4),
    borderRadius: 50,
  },
  profileImage: {
    width: ms(45),
    height: ms(45),
    borderRadius: 100,
  },
  logoutContanier: {
    marginTop: ms(8),
    flexDirection: 'row',
    backgroundColor: colors.AppTheme.Secondary,
    marginEnd: ms(16),
    marginStart: ms(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    borderRadius: 10,
  },
  logoutButtonTitle: {
    color: colors.AppTheme.Text,
    fontSize: ms(16),
  },
  logoutButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDisplayName: {
    marginLeft: ms(10),
    fontSize: ms(16),
    color: colors.AppTheme.Text,
    fontFamily: 'Poppins-Medium',
  },
  userViewProfile: {
    color: colors.AppTheme.Text,
    textDecorationLine: 'underline',
    fontSize: ms(16),
  },
  logoutIconView: {
    backgroundColor: '#00063D',
    borderRadius: ms(50),
    padding: ms(8),
    marginVertical: ms(5),
    marginHorizontal: ms(12)
  },
});
