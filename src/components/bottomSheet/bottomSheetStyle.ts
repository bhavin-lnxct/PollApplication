import { ms, ScaledSheet } from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

export default ScaledSheet.create({
    modalContainer: {
        justifyContent: 'flex-end',
        padding: 0,
        margin: 0,
    },
    secondContainer: {
        backgroundColor: colors.AppTheme.Secondary,
        borderTopEndRadius: ms(15),
        borderTopStartRadius: ms(15),
        padding: ms(10),
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: ms(20),
        backgroundColor: colors.AppTheme.Secondary,
        borderTopEndRadius: ms(15),
        borderTopStartRadius: ms(15),
        width: '100%',
        paddingHorizontal: ms(10)
    
    },
    btnText: {
        fontSize: ms(11),
        color: colors.AppTheme.blackShade02,
    },
    btnImage: {
        width: ms(55),
        height: ms(55),
    },

   
})