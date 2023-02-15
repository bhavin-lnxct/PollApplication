import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

export const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: ms(16),
    paddingTop: ms(16),
    paddingBottom:ms(16),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.AppTheme.Primary,
  },
  imageStyle: {
    height: ms(40),
    width: ms(40),
    borderRadius: ms(50),
    borderColor: '#fff',
    borderWidth: ms(1),
  },
  headerTitleStyle: {
    fontSize: ms(16),
    fontStyle: 'normal',
    fontFamily:'DMSans-Bold',
    color:colors.AppTheme.Secondary
  },
  postTextStyle: {
    fontSize: ms(14),
    fontWeight: 'bold',
    color: '#1e90ff',
  },
});