import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

export default ScaledSheet.create({
  cardContainer: {
    padding: ms(16),
    backgroundColor: '#FFF',
    position: 'relative',
    borderRadius: ms(10),
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  cardView: {
    marginTop: ms(8),
  },
  title: {
    fontSize: ms(18),
    lineHeight: ms(26),
    // fontWeight: '600',
    color: colors.AppTheme.Text,
    fontFamily: 'DMSans-Bold',
  },
  description: {
    alignItems: 'center',
    flex: 1,
    color: colors.AppTheme.Text,
  },
  descriptionNotNull: {
    color: colors.AppTheme.label,
    marginBottom: ms(16),
    marginTop: ms(8),
  },
  repostContainer: {
    backgroundColor: '#fff',
    borderRadius: ms(32),
    paddingVertical: ms(16),
    paddingHorizontal: ms(6),
  },
  userCardHeader: {
    borderRadius: ms(5),
    backgroundColor: '#fff',
    padding: ms(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  userCardHeaderImage: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCardImage: {
    width: ms(30),
    height: ms(30),
    borderRadius: ms(50),
  },
  explanationText: {
    color: colors.AppTheme.Primary,
    fontSize: ms(14),
    marginTop: ms(13),
  },
  explanations: {
    width: '100%',
    marginBottom: ms(13),
    borderWidth: ms(0.3),
    borderColor: colors.AppTheme.PlaceholderColor,
  },
  userCardExplanationText: {
    color: colors.AppTheme.Primary,
    fontSize: ms(15),
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  userName: {
    color: colors.AppTheme.Primary,
    marginLeft: ms(8),
  },
  labelViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 0.3,
    borderColor: '#C6C6C6',
    borderRadius: ms(20),
    paddingVertical: ms(5),
    paddingHorizontal: ms(10),
    margin: ms(3),
  },
  labelText: {
    marginHorizontal: ms(5),
    fontSize: ms(12),
    color: colors.AppTheme.Text,
  },
});
