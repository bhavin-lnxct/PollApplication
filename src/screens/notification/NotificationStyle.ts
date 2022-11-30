import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

export default ScaledSheet.create({
  userImage: {
    height: ms(44),
    width: ms(44),
    borderRadius: ms(50),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainRow: {
    marginTop: ms(16),
  },
  horizontal: {
    marginHorizontal: ms(16),
  },
  userText: {
    fontSize: ms(16),
    color: colors.AppTheme.Text,
  },
  userName: {
    color: colors.AppTheme.Text,
    fontFamily: 'Poppins-Bold',
    fontSize: ms(16),
  },
  userPadding: {
    paddingHorizontal: ms(8),
  },
  bgColor: {
    backgroundColor: '#d8e0e8',
  },
});
