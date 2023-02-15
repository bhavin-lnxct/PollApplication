import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: ms(42),
    lineHeight: ms(84),
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },

  iconImageContainer: {
    borderRadius: ms(15),
    height: ms(116),
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIconContainer: {
    position: 'absolute',
    right: ms(10),
    top: ms(10),
  },
  deleteIconStyle: {
    // backgroundColor: 'rgba(0, 6, 61,.5)',
    backgroundColor: colors.AppTheme.Primary,
    borderRadius: ms(30),
    padding: ms(5),
  },
  previewImage: {
    height: ms(100),
    width: ms(100),
    borderRadius: ms(10),
  },
  imageIcon: {
    backgroundColor: colors.AppTheme.GreenBlueCrayola,
    padding: ms(10),
    borderRadius: ms(25),
  },
  textInputStyle: {
    color: colors.AppTheme.Text,
    fontSize: ms(16),
    marginLeft: ms(7),
  },
  addOptionButtonContainer: {
   margin:ms(20)
  },
  addOptionText: {
    textAlign: 'center',
    color: colors.AppTheme.Secondary,
    fontSize: ms(16),
  },
  multiImageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: ms(16),
    marginTop: ms(20),
  },
  animatedContainer: {
    backgroundColor: colors.AppTheme.Primary,
    borderBottomLeftRadius: ms(20),
    borderBottomRightRadius: ms(20),
    paddingTop: ms(10),
    paddingBottom: ms(40),
    paddingHorizontal: ms(10),
  },
  animatedTitleTest: {
    color: 'rgb(255, 255, 255)',
    fontSize: ms(20),
    fontFamily: 'DMSans-Bold',
  },
  animatedTextInputView: {
    borderBottomWidth: ms(2),
    borderBottomColor: 'rgb(255, 255, 255)',
  },
  row: {
    flexDirection: 'row',
  },
  createImageMain: {
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: ms(10),
  },
  PlusIcon: {
    borderRadius: ms(10),
    backgroundColor: '#E4E4E4',
    height: ms(100),
    width: ms(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
