import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    height: ms(50),
    minWidth: ms(50),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.blackShade20,
    borderRadius: ms(30),
    overflow: 'hidden',
  },
  linearGradientContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color:'white',
  },
  titleTextStyle: {
    color: 'white',
    fontSize: ms(16),
  },
});