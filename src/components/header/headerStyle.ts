import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';
import {StatusBar} from 'react-native';

export const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: ms(16),
    paddingVertical: ms(16),
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: colors.AppTheme.HeaderBg,
    backgroundColor: colors.AppTheme.Primary,
    // borderBottomLeftRadius:ms(20),
    // borderBottomRightRadius:ms(20),
  },
  headerContainer: {
    overflow: 'hidden',
    paddingBottom: ms(0),
  },
  imageStyle: {
    height: 37,
    width: 37,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
  },
  headerTitleStyle: {
    fontSize: ms(16),
    fontStyle: 'normal',
    // color: '#EBEBEB',
    // fontFamily: 'Roboto-Bold',
    fontFamily:'Poppins-Bold',
    color:colors.AppTheme.Secondary
  },
  postTextStyle: {
    fontSize: ms(14),
    fontWeight: 'bold',
    color: '#1e90ff',
  },
});

// flex

