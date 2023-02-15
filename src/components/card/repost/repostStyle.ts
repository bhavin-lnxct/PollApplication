import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
  checkbox: {
    width: ms(20),
    height: ms(20),
    borderWidth: ms(1),
    borderRadius: ms(5),
    borderColor: colors.AppTheme.PlaceholderColor,
  },
  checkboxChecked: {
    backgroundColor: colors.AppTheme.Primary,
    borderColor: colors.AppTheme.Primary,
  },
  checkboxIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: ms(8),
    paddingHorizontal: ms(16),
    
  },
  checkboxText: {
    color: colors.AppTheme.Text,
    fontSize: ms(16),
  },
});
