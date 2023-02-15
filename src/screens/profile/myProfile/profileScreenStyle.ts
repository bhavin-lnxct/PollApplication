import {ms, s, ScaledSheet} from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F5F5F5'
  },
  imageStyle: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  profileHeaderContainer: {
    marginHorizontal: ms(16),
    marginTop: ms(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userName:{
    fontSize: ms(16),
    color: colors.AppTheme.Text,
    fontFamily: 'DMSans-Bold',
    marginTop: ms(8),
    marginLeft: ms(16),
  },
  bioText: {
    color: colors.AppTheme.Text,
    fontSize: ms(14),
    marginTop: ms(6),
    marginHorizontal: ms(16),
  },
  userProfileName:{
    marginHorizontal: ms(16),
    marginTop: ms(8),
    marginBottom: ms(16),
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
    margin:ms(16),
    height: ms(40),
    borderRadius: ms(10),
  },
  moreLessText:{
    color: colors.AppTheme.Primary,
    paddingHorizontal: s(16),
    width: '100%',
  },
  tabBar:{
    backgroundColor: colors.AppTheme.Secondary,
    elevation: 0,
    height: ms(50),
    justifyContent: 'center',
  },
  tabBarText:{
    color: colors.AppTheme.Primary,
    fontSize: ms(16)
  },
  editProfileButtonView:{
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  editProfileText:{
    marginLeft: ms(3),
    fontSize: ms(15),
    color: colors.AppTheme.Text,
  }
});
