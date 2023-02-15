import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {flex: 1},
  headerTitle: {
    fontSize: ms(24),
    fontWeight: 'bold',
    color: colors.AppTheme.Text,
    textAlign: 'center',
    marginTop: ms(24),
  },
  restorePasswordTextInput: {
    height: ms(48),
    padding: ms(16),
    marginTop: ms(60),
    borderColor: colors.AppTheme.grayShadeCC,
    borderWidth: ms(1),
    borderRadius: ms(50),
    fontSize: ms(13),
    color: 'black',
  },
  restorePasswordText: {
    textAlign: 'center',
    marginTop: ms(20),
    paddingHorizontal: ms(20),
    fontSize: ms(16),
    color: colors.AppTheme.grayShade8F,
  },
  sendCodeButton: {
    marginHorizontal: ms(16),
    marginTop: ms(32),
    borderRadius: ms(50),
  },
  sendCodeButtonTitle: {
    fontSize: ms(16),
  },
  cancelButton: {
    marginHorizontal: ms(16),
    marginTop: ms(16),
    backgroundColor: "rgba(0, 6, 61, 0.3)",
    height: ms(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(50),
  },
  imageStyleView: {
    alignItems: 'center',
    marginTop: ms(44),
  },
});
