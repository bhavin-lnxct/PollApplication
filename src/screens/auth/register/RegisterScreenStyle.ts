import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flex: 1,
  },

  signUpHeaderTitle: {
    fontSize: ms(24),
    fontWeight: 'bold',
    color: colors.AppTheme.Text,
    textAlign: 'center',
    marginTop: ms(24),
  },
  signUpFormTextInput: {
    height: ms(40),
    padding: ms(14),
    marginTop: ms(16),
    paddingHorizontal: ms(15),
    paddingVertical: ms(12),
    borderColor: colors.AppTheme.Primary,
    borderBottomWidth: ms(0.5),
    fontSize: ms(13),
    color: 'black',
  },
  loginContainer: {
    marginTop: ms(32),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: ms(16),
    color: colors.AppTheme.grayShadeAB,
  },
  termsOfServiceContainer: {
    marginTop: ms(16),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonContainer: {
    marginTop: ms(32),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: ms(180),
    width: ms(180),
  },
  imageStyleView: {
    alignItems: 'center',
    marginTop: ms(44),
  },
  socialButtonContainer: {
    alignItems: 'center',
    marginTop: ms(24),
  },
  authMainBox: {
    marginHorizontal: ms(16),
    marginTop: ms(40),
  },
  signupButton: {
    marginHorizontal: ms(16),
    marginTop: ms(40),
  },
});
