import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

export default ScaledSheet.create({
  userImage: {
    height: ms(44),
    width: ms(44),
    borderRadius: ms(50),
  },
  bottomIcon: {
    width: '100%',
    marginVertical: ms(10),
    paddingBottom: ms(80),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: ms(10),
  },
  userText: {
    fontSize: ms(14),
    color: colors.AppTheme.Text,
  },
  userName: {
    color: colors.AppTheme.Text,
    fontFamily: 'DMSans-Bold',
    fontSize: ms(14),
  },
  textContainer: {
    paddingHorizontal: ms(8),
  },
  timeStamp:{
    color: '#535353',
    fontSize: ms(12),
    paddingHorizontal: ms(8),
  },
  clearAll:{
    color:colors.AppTheme.Primary,
    fontSize:ms(16),
    fontWeight:'800',
    textAlign:'right',
    textDecorationLine: 'underline',
    margin:ms(16)
  },
  iconStyle:{
    backgroundColor:colors.AppTheme.OtherSecond, 
    borderRadius:ms(15),
    padding:ms(3)
  },
  noNotificationContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
});
