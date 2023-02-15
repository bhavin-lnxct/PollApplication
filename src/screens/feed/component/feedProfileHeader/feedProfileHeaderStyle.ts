import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colors from '../../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: ms(45),
    width: ms(45),
    borderRadius: ms(50),
  },
  textContainer: {
    paddingLeft: ms(14),
  },
  title: {
    color: colors.AppTheme.Text,
    fontSize: ms(16),
    fontFamily: 'DMSans-Medium',
  },
  description: {
    color: colors.AppTheme.blackShade50,
    fontSize: ms(12),
    marginTop: ms(8),
  },
  repostContainer: {
    backgroundColor: '#fff',
    borderRadius: ms(32),
    paddingVertical: ms(16),
  },
  checkboxCheck: {
    backgroundColor: colors.AppTheme.OtherSecond,
  },
  reportButton: {
    marginHorizontal: ms(16),
    marginTop: ms(20),
    borderRadius: ms(32),
    marginBottom: ms(16),
  },
  reportTextHeader: {
    color: colors.AppTheme.Text,
    textAlign: 'center',
    fontSize: ms(18),
    fontWeight: '700',
    borderBottomColor: colors.AppTheme.OtherSecond,
    borderBottomWidth: ms(1),
    paddingBottom: ms(16),
  },
  reportDescription: {
    color: colors.AppTheme.Text,
    fontWeight: 'bold',
    marginVertical: ms(8),
    textTransform: 'capitalize',
  },
  reportContent: {
    marginHorizontal: ms(16),
  },
  popupModal: {
    paddingVertical: ms(40),
    paddingHorizontal: ms(16),
    backgroundColor: '#fff',
    borderRadius: ms(10),
  },
  popupModalTitle: {
    color: colors.AppTheme.Text,
    flexWrap: 'wrap',
    fontFamily: 'DMSans-Medium',
  },
  popupModalButton: {
    marginTop: ms(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: colors.AppTheme.Primary,
    paddingHorizontal: ms(57),
    paddingVertical: ms(12),
    // borderRadius: ms(30),
  },
  buttonYes: {
    color: colors.AppTheme.Secondary,
    fontSize: ms(17),
  },
  modalButtonSecond: {
    backgroundColor: colors.AppTheme.OtherSecond,
  },
  buttonNo: {
    color: colors.AppTheme.Text,
  },
});
