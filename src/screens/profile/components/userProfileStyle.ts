import { ms, ScaledSheet } from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    backgroundColor: colors.AppTheme.Secondary,
    maxHeight: ms(320),
    borderRadius: ms(32),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: ms(16),
    marginTop: ms(32),
    marginBottom:ms(8),
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
    flexDirection: 'row',
    backgroundColor: colors.AppTheme.Secondary,
    marginEnd: ms(16),
    marginStart: ms(16),
  },
  logoutButtonTitle: {
    color: colors.AppTheme.Text,
    fontSize: ms(16),
  },
  logoutButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start'
  },
  userDisplayName: {
    marginLeft: ms(10),
    fontSize: ms(16),
    color: colors.AppTheme.Text,
    fontFamily: 'DMSans-Medium',
  },
  userViewProfile: {
    color: colors.AppTheme.Primary,
    textDecorationLine: 'underline',
    fontSize: ms(16),
  },
  logoutIconView: {
    padding: ms(8),
    marginVertical: ms(8),
  },
});
