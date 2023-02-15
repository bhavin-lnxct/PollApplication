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
  aboutButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor:"#fff",
    marginTop: ms(10),
    borderRadius:ms(10),
  }
});