import { ms, s, ScaledSheet, vs } from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flex: 1,
  },
  titleTextInput: {
    height: ms(70),
    padding: ms(14),
    marginTop: ms(16),
    paddingHorizontal: ms(20),
    paddingVertical: ms(12),
    borderRadius: ms(10),
    fontSize: ms(20),
    color: 'black',
    textAlignVertical: 'top',
  },
  descriptionContainer: {
    height: ms(100),
    textAlignVertical: 'top'
  },
  optionContainer: {
    marginTop: ms(10),
  },
  optionTextInput: {
    height: ms(50),
    marginTop: ms(10),
    padding: ms(10),
    fontSize: ms(13),
    borderColor: colors.AppTheme.PlaceholderColor,
    borderWidth: 1,
    borderRadius: ms(10),
    color: '#000',
  },
  closeTextInput: {
    height: ms(50),
    marginTop: ms(10),
    padding: ms(10),
    backgroundColor: '#fff',
    fontSize: ms(16),
    borderColor: colors.AppTheme.PlaceholderColor,
    borderWidth: 1,
    borderRadius: ms(10),
    color: 'black',
    width: '85%'
  },
  moreOptionTextInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  removeOptionView: {
    marginRight: ms(5),
    alignItems: 'center',
  },
  addOptionButton: {
    marginTop: ms(20),
    alignItems: 'center',
  },
  moreOptionTextInput: {
    height: ms(50),
    padding: ms(14),
    marginVertical: ms(8),
    paddingHorizontal: ms(20),
    paddingVertical: ms(12),
    borderColor: '#CCCED2',
    borderWidth: ms(1),
    borderRadius: ms(10),
    fontSize: ms(13),
    color: 'black',
    width: '90%',
  },
  pollTitle: {
    fontSize: ms(18),
    color: colors.AppTheme.Text,
    fontFamily: 'Poppins-Bold',
    paddingLeft: ms(6),
  },
  pollContain: {
    marginTop: ms(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  addOptionButtonStyle: {
    // justifyContent:'flex-end',
    alignItems: 'flex-end',
    width: ms(100),
    borderRadius: ms(10),
    flex: 1,
    // flexDirection:'row',
    height: ms(40),
    marginTop: ms(16),
    backgroundColor: 'transparent',
  },
  addOptionText: {
    color: colors.AppTheme.Text,
    fontSize: ms(16),
    fontFamily: 'Poppins-Medium',
    borderBottomWidth: 1,
    borderBottomColor: colors.AppTheme.Text

  },
  selectPollText: {
    fontSize: ms(16),
    color: colors.AppTheme.Text,
    fontFamily: 'Poppins-Bold',
  },
  selectPoll: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: ms(16),
  },
  reactdatepicker__monthtext: {
    color: 'red',
  },
  containerCreateFeed: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: ms(5),
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.AppTheme.Text,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.AppTheme.Text,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  containerRange: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: ms(16),
  },
  voteRangeText: {
    color: colors.AppTheme.Text,
    fontFamily: 'Poppins-Medium',
    fontSize: ms(14),
  },
  uploadImageText: {
    fontSize: ms(16),
    color: colors.AppTheme.Text,
    marginRight: ms(6),
  },
  uploadImageTextMain: {
    marginTop: ms(16),
    alignItems:'center',
  }
});
