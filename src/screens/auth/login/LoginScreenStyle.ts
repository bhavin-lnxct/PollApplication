import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {flex: 1},

  loginHeaderTitle: {
    fontSize: ms(24),
    fontWeight: 'bold',
    color: colors.AppTheme.Text,
    textAlign: 'center',
    marginTop: ms(24),
  },
  secondContainer: {
    marginHorizontal: ms(16),
    marginTop: ms(30),
  },
  loginTextInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#7D7D7D',
    paddingHorizontal: ms(10),
  },

  loginTextInputMH: {
    marginHorizontal: ms(16),
  },
  loginTextInputContainerPass: {
    flexDirection: 'row',
    borderBottomWidth: 1,

    alignItems: 'center',
    borderColor: '#7D7D7D',
    paddingHorizontal: ms(10),
  },

  loginFormTextInput: {
    paddingVertical: ms(12),
    paddingHorizontal: ms(15),
    fontSize: ms(13),
    color: 'black',
    width: '90%',
  },
  signUpContainer: {
    marginTop: ms(32),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButtonText: {
    fontSize: ms(16),
    color: colors.AppTheme.grayShadeAB,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: ms(12),
  },
  forgotPasswordText: {
    color: colors.AppTheme.grayShade8F,
    fontSize: ms(15),
  },
  imageStyleView: {
    alignItems: 'center',
    marginTop: ms(44),
  },
});
