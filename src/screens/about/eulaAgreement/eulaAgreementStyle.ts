import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {flex: 1, backgroundColor: colors.AppTheme.Secondary},
  headerTitle: {
    fontSize: ms(32),
    marginLeft: ms(24),
    marginTop: ms(16),
    color: colors.blackShade02,
    fontWeight: 'bold',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.AppTheme.Secondary,
    paddingTop: ms(10),
  },
  subHeaderTitle: {
    marginRight: ms(24),
    fontSize: ms(18),
    fontWeight: '600',
    color: colors.blackShade20,
    marginLeft: ms(24),
    marginTop: ms(24),
  },
  termsOfUseTextContainer: {
    textAlign: 'justify',
    marginHorizontal: ms(24),
    marginTop: ms(20),
    color: colors.blackShade20,
  },
});
