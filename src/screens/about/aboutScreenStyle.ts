import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.AppTheme.Secondary,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: colors.AppTheme.Secondary,
    paddingTop: ms(10),
  },
});