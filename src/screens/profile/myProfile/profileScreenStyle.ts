import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#d8e0e8'
  },
  imageStyle: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  profileHeaderContainer: {
    margin: ms(16),
    marginVertical: ms(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textMainContainer: {
    flexDirection: 'row',
    flex: 1,
    width: '80%',
    height: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: ms(15),
  },
  textContainer: {
    alignItems: 'center',
    padding: ms(5),
  },
  headerContainerText: {
    color: 'black',
    fontSize: ms(16),
    fontWeight: '700',
  },
  headerFollowerText: {
    color: 'black',
    fontSize: ms(16),
    fontWeight: '400',
  },
  profileButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: ms(16),
    marginRight: ms(16),
    marginBottom: ms(16),
    height: ms(40),
    borderRadius: ms(10),
  },
});
