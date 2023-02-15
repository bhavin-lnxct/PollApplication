import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

export default ScaledSheet.create({
  pollRowImageContainer: {
    height: ms(40),
    marginHorizontal: ms(12),
    justifyContent: 'center',
  },
  pollContainerButton: {
    height: '100%',
    justifyContent: 'center',
  },
  pollContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pollFillView: {
    left: 0,
    height: '100%',
    position: 'absolute',
  },
  optionPurntegText: {
    fontSize: ms(13),
    color: colors.AppTheme.Text,
    fontFamily: 'DMSans-Medium',
    width: ms(40),
  },
  optionText: {
    color: colors.AppTheme.Text,
    fontSize: ms(15),
    marginLeft: ms(10),
    fontFamily: 'DMSans-Medium',
  },
  votedOptionText: {
    borderWidth: ms(1.5),
    borderColor: '#000',
    borderRadius: ms(50),
    height: ms(16),
    width: ms(16),
  },
  alreadyVoted: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemAlreadyVoted: {
    marginHorizontal: ms(12),
  },
  optionsText: {
    borderWidth: ms(1.5),
    borderColor: '#000',
    borderRadius: ms(50),
    height: ms(16),
    width: ms(16),
  },
  cardViewContainer: {
    padding: ms(16),
    // margin: ms(8),
    backgroundColor: '#fff',
    borderRadius: ms(10),
    // width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
});
