import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    // flex: 1,
    height: ms(50),
    minWidth: ms(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(15),
    overflow: 'hidden',
  },
  linearGradientContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  titleTextStyle: {
    color: '#fff',
    // fontFamily:'MDsans-Medium',
    fontSize: ms(17),
    lineHeight:ms(24)
  },
});
