import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
  pollRowContainer: {
    height: ms(44),
    marginVertical: ms(4),
    backgroundColor: 'white',
    borderRadius: ms(30),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  voteContainer: {
    height: ms(35),
    margin: ms(4),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#003C71',
    width: ms(35),
    borderRadius: ms(30),
    justifyContent: 'center',
  },
  optionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
  },
  voteText: {
    color: 'white',
    fontSize: ms(14),
    fontFamily: 'Poppins-Bold',
  },
  optionText: {
    color: colors.AppTheme.Text,
    fontSize: ms(13),
    fontFamily: 'Poppins-Medium',
    paddingLeft: ms(10),
  },
  percentageText: {
    color: colors.AppTheme.Text,
    marginHorizontal: ms(15),
    fontSize: ms(14),
    fontFamily: 'Poppins-Medium',
  },
  votedView: {
    bottom: ms(47),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: ms(7),
    marginVertical: ms(3),
    height: ms(44),
  },
  unVotedView: {
    bottom: ms(53),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: ms(7),
    marginVertical: ms(3),
    height: ms(44),
  },
  explanationContainer: {
    backgroundColor: colors.AppTheme.Secondary,
    borderTopLeftRadius: ms(10),
    borderTopRightRadius: ms(10),
  },
  explanationHeadingText: {
    fontFamily: 'Roboto-Bold',
    color: colors.AppTheme.Primary,
    marginTop: ms(6),
    marginLeft: ms(12),
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
    margin: ms(6),
    borderRadius: ms(18),
    backgroundColor: '#fff',
    padding: ms(10),
    borderColor: 'rgba(43, 50, 95, 0.8)',
    // bottom: ms(34),
    borderRadius: ms(7),
    marginVertical: ms(3),
    height: '100%',
  },
  totalVotesText: {
    fontSize: ms(13),
    color: colors.AppTheme.Primary,
    paddingVertical: ms(10),
    borderBottomColor: '#C6C6C6',
    borderBottomWidth: ms(0.2),
    paddingHorizontal: ms(16),
  },
  pollRowImageContainer: {
    height: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
    // margin: ms(6),
  },
  pollRowContainerVoted: {
    marginTop: ms(10),
  },
  pollContainerButtonVoted: {
    height: ms(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: ms(3),
  },
  pollContainerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pollContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  pollImageTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pollFillView: {
    position: 'absolute',
    left: 0,
    height: '100%',
  },

  themeButton: {
    marginHorizontal: ms(0),
    marginTop: ms(20),
    marginBottom: ms(0),
    height: ms(43),
  },

  optionPurntegText: {
    fontSize: ms(13),
    color: colors.AppTheme.Text,
    fontWeight: '600',
  },
});
