import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {flex: 1},
  headerTitle: {
    fontSize: ms(24),
    fontWeight: 'bold',
    marginTop: ms(30),
    color: 'black',
  },
  verificationCodeText: {
    textAlign: 'center',
    marginTop: ms(12),
    fontSize: ms(16),
    color: colors.AppTheme.grayShade8F,
  },
  verificationCodeTextInput: {
    height: ms(48),
    padding: ms(16),
    marginTop: ms(15),
    borderColor: colors.AppTheme.grayShadeCC,
    borderWidth: ms(1),
    borderRadius: ms(50),
    fontSize: ms(13),
    color: 'black',
  },
  resendButton: {
    marginHorizontal: ms(16),
    marginTop: ms(16),
    borderRadius: ms(50),
  },
  resendButtonTitle: {
    fontSize: ms(16),
  },
  verificationCodeTextContainer: {
    textAlign: 'center',
    fontSize: ms(14),
    marginTop: ms(24),
  },
  loginFormTextInput:{
    fontSize: ms(13),
    color: 'black'
  },
  imageStyleView: {
    alignItems: 'center',
    marginTop: ms(44),
  },
});