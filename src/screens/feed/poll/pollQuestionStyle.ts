import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flex: 1,
    borderRadius: ms(3),
    borderColor: '#C6C6C6',
    borderWidth: ms(0.2),
  },
  totalVotesText: {
    fontSize: ms(13),
    color: colors.AppTheme.Primary,
    paddingVertical: ms(12),
    borderColor: '#C6C6C6',
    borderWidth: ms(0.2),
    paddingHorizontal: ms(16),
    textAlign:'right'
  },
  pollRowImageContainer: {
    height: ms(40),
    marginHorizontal: ms(12),
    justifyContent: 'center',
  },
  pollContainerButton: {
    height: '100%',
    justifyContent: 'center',
  },
  pollContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pollFillView: {
    left: 0,
    height: '100%',
    position: 'absolute',
  },
  optionPurntegText: {
    fontSize: ms(13),
    color: colors.AppTheme.Text,
    fontFamily: 'DMSans-Medium',
    width: ms(40),
  },
  optionText: {
    color: colors.AppTheme.Text,
    fontSize: ms(15),
    marginLeft: ms(10),
    fontFamily: 'DMSans-Medium',
  },
  explanationContainer: {
    backgroundColor: colors.AppTheme.Secondary,
    borderTopLeftRadius: ms(10),
    borderTopRightRadius: ms(10),
    padding: ms(10),
  },
  explanationHeadingText: {
    fontFamily: 'Roboto-Bold',
    color: colors.AppTheme.Primary,
    marginBottom: ms(4),
  },
  explanationInputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  explanationInput: {
    flex: 1,
    color: colors.AppTheme.Primary,
    borderWidth: ms(1),
    borderRadius: ms(18),
    backgroundColor: '#fff',
    padding: ms(10),
    borderColor: colors.AppTheme.Primary,
    height: '100%',
  },
  addOptionButtonContainer: {
    marginHorizontal: ms(0),
    marginTop: ms(10),
    marginBottom: ms(0),
    height: ms(43),
    borderRadius: ms(50),
  },
  addOptionText: {
    textAlign: 'center',
    color: colors.AppTheme.Secondary,
    fontSize: ms(16),
  },
  checkIcon: {
    marginLeft: ms(30),
  },
  votedOptionText: {
    borderWidth: ms(1.5),
    borderColor: '#000',
    borderRadius: ms(50),
    height: ms(16),
    width: ms(16),
  },
  alreadyVoted: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemAleadyVoted: {
    marginHorizontal: ms(12),
  },
  optionsText: {
    borderWidth: ms(1.5),
    borderColor: '#000',
    borderRadius: ms(50),
    height: ms(16),
    width: ms(16),
  },
  ReasoningTitle: {
    color: colors.AppTheme.Text,
    fontSize: ms(16),
    fontFamily: 'DMSans-Bold',
    marginTop: ms(10),
    marginLeft: ms(5),
  },
  reasoningTextInput: {
    marginTop: ms(5),
    fontSize: ms(14),
    width: '100%',
    height: ms(80),
    paddingHorizontal: ms(12),
    color: colors.AppTheme.Text,
    borderRadius: ms(3),
    borderColor: '#C6C6C6',
    borderWidth: ms(0.2),
    textAlignVertical: 'top',
  },
  viewMoreGradient: {
    position: 'absolute',
    bottom: ms(-16),
    left: ms(-16),
    width: '110%',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: ms(10),
    borderBottomRightRadius: ms(10),
    height: '100%',
    paddingHorizontal: ms(12),
    paddingBottom: ms(5),
  },
  resultButton: {
    minWidth: ms(50),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: colors.AppTheme.SecondaryNew,
    marginHorizontal: ms(0),
    marginTop: ms(10),
    marginBottom: ms(0),
    height: ms(43),
    borderRadius: ms(30),
  },
  ViewMoreButton: {
    flexDirection:'row',
    alignItems:'center',
    borderColor:'#BBBBBB',
    borderWidth:0.2,
    borderRadius:ms(20),
    width:'30%',
    justifyContent:'center',
    padding:ms(3),
    alignSelf:'center',
    marginTop:ms(10)
  },
  viewMoreText:{
    color:colors.AppTheme.Text,
    fontSize:ms(14)
  }
});
