import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

export default ScaledSheet.create({
  cardContainer: {
    padding: ms(16),
    backgroundColor: '#FFF',
    position: 'relative',
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
    marginTop: ms(8),
  },
  title: {
    fontSize: ms(18),
    lineHeight: ms(26),
    color: colors.AppTheme.Text,
    fontFamily: 'DMSans-Bold',
  },
  addOptionButtonContainer: {
    marginTop: ms(10),
    // padding: ms(4),
    height: ms(38),
    borderRadius: ms(50),
  },
  addOptionText: {
    textAlign: 'center',
    color: colors.AppTheme.Secondary,
    fontSize: ms(16),
  },
});
