import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flex: 1,
  },
  userImage: {
    height: ms(50),
    width: ms(50),
    borderRadius: ms(50),
  },
  searchBar: {
    backgroundColor: colors.AppTheme.OtherSecond,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(5),
    margin: ms(16),
    height: ms(40),
    borderRadius: ms(20),
  },
  searchBarIcon: {
    padding: ms(8),
    borderRadius: ms(20),
  },
  searchBarTextInput: {
    color: colors.AppTheme.Text,
    borderRadius: ms(20),
    height: '100%',
    width: '100%',
  },
  allFollowersText: {
    color: colors.AppTheme.Text,
    marginHorizontal: ms(16),
    marginBottom: ms(16),
    fontWeight: 'bold',
    fontSize: ms(16),
    textDecorationLine: 'underline',
  },
  noFollowersText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userRowContainer: {
    flexDirection: 'row',
    marginHorizontal: ms(16),
    paddingVertical: ms(5),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: ms(7),
    width: ms(80),
    borderRadius: ms(8),
    backgroundColor: colors.AppTheme.OtherSecond,
  },
});
