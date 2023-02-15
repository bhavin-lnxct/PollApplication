import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  explanationHeaderText: {
    marginTop: ms(16),
    marginLeft: ms(16),
    marginBottom: ms(8),
    fontFamily: 'DMSans-Bold',
    color: colors.AppTheme.blackShade02,
  },
  explanationListContainer: {
    backgroundColor: '#FFF',
    borderRadius: ms(10),
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  explanationsContainer: {
    borderRadius: ms(5),
    paddingVertical: ms(10),
    paddingHorizontal: ms(16),
    alignItems: 'center',
    flexDirection: 'row',
  },
  userImage: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(50),
  },
  userName: {
    color: colors.AppTheme.Text,
    marginLeft: ms(8),
  },
});
