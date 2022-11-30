import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

export default ScaledSheet.create({
  cardContainer: {
    paddingVertical: ms(20),
    paddingHorizontal: ms(20),
    backgroundColor: '#FFF',
    borderRadius: ms(10),
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  cardView: {
    paddingTop: ms(16),
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.AppTheme.Text,
  },
  description: {
    alignItems: 'center',
    flex: 1,
    color: colors.AppTheme.Text,
  },
  repostContainer: {
    flex: 1,
    backgroundColor: '#d8e0e9',
    maxHeight: ms(450),
    borderRadius: ms(32),
    paddingTop: ms(16),
  },
});
