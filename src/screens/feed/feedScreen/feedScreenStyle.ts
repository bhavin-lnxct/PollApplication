import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  bottomIcon: {
    width: '100%',
    marginVertical: ms(10),
    paddingBottom: ms(80),
  },
  viewPoll: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ms(16),
    marginBottom: ms(8),
    backgroundColor: colors.AppTheme.Secondary,
    padding: ms(16),
  },
  viewPollText:{
    fontFamily: 'DMSans-Bold',
    color: colors.AppTheme.Text,
    fontSize: ms(16),
  },
  genderText: {
    color: colors.AppTheme.Text,
    fontFamily: 'DMSans-Medium',
    marginLeft: ms(16),
    marginRight: ms(8),
    fontSize: ms(16),


  },
  viewPollContent:{
    flexDirection: 'row',
    alignItems: 'center',
  },
});
