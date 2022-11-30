import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {flex: 1},
  header: {fontSize: ms(16)},
  settingButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginEnd: ms(16),
    color: colors.blackShade02,
  },
  buttonTitle: {
    color: colors.blackShade02,
    fontSize: ms(16),
    padding: ms(16),
  },
  rightCornerIcon: {
    flexDirection: 'row',
    color: colors.blackShade02,
    padding: ms(16),
  },
});

