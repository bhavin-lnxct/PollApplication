import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
  pollRowImageContainer: {
    height: ms(72),
    marginVertical: ms(4),
    backgroundColor: 'white',
    borderRadius: ms(7),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  pollContainerButtonVoted: {
    bottom: ms(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: ms(3),
  },
  pollContainerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pollContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  pollImage: {
    width: '100%',
    height: ms(72),
    borderTopLeftRadius: ms(7),
    borderBottomLeftRadius: ms(7),
  },
  pollImageTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'red',
  },
  pollFillView: {
    position: 'absolute',
    left: 0,
    borderBottomRightRadius: ms(7),
    borderTopRightRadius: ms(7),
    height: '100%',
  },
});
