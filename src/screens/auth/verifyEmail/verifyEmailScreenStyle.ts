import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {flex: 1},
  headerTitle: {
    fontSize: ms(24),
    fontWeight: 'bold',
    marginTop: ms(30),
    color: 'black'
  },
  loginHeaderTitle: {
    fontSize: ms(24),
    fontWeight: 'bold',
    color: colors.AppTheme.Text,
    textAlign: 'center',
    marginTop: ms(24),
  },
  verificationCodeText: {
    textAlign: 'center',
    marginTop: ms(12),
    fontSize: ms(16),
    color: 'black'
  },
  verificationCodeTextInput: {
    height: ms(48),
    padding: ms(16),
    marginTop: ms(24),
    borderColor: colors.AppTheme.grayShadeCC,
    borderWidth: ms(1),
    borderRadius: ms(50),
    fontSize: ms(13),
    color: 'black'
  },
  resendButton: {
    marginHorizontal: ms(16),
    marginTop: ms(16),
    borderRadius: ms(50),
  },
  verifyEmailButton: {
    marginHorizontal: ms(16),
    marginTop: ms(32),
    borderRadius: ms(50),
  },
  resendButtonTitle: {
    fontSize: ms(16),
    color: 'white',
  },
  verificationCodeTextContainer: {
    textAlign: 'center',
    fontSize: ms(14),
    marginTop: ms(24),
    marginHorizontal: ms(16),
    color: colors.AppTheme.grayShade8F,
  },
  secondContainer:{
    marginHorizontal: ms(16),
    marginTop: ms(30)
  },
  loginTextInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#7D7D7D',
    // paddingHorizontal: ms(10)
},
imageStyleView: {
  alignItems: 'center',
  marginTop: ms(44),
},
});
