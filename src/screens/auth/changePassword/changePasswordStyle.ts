import {ms, ScaledSheet} from 'react-native-size-matters';
export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#EFEFEF',
  },
  inputContainer: {
    marginHorizontal: ms(16),
    marginTop: ms(16),
  },
  textInput: {
    color: 'black',
    height: ms(50),
    marginTop: ms(10),
    padding: ms(10),
    fontSize: ms(13),
    borderRadius: ms(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%',
  },
  buttonView: {
    marginTop: ms(60),
    alignItems: 'center',
  },
});
