import { ms, s, ScaledSheet, vs } from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // margin: ms(10), 
        paddingHorizontal: ms(16),
        paddingVertical: ms(16),
        alignItems: 'center',
        backgroundColor: colors.AppTheme.HeaderBg,
    },
    titleText: {
        // fontSize: ms(16),
        // fontWeight: 'bold',
        // color: colors.AppTheme.Text,

        fontSize: ms(14),
        fontWeight: 'bold',
        color: '#1e90ff',
    },
    IconRight: {
        marginRight: ms(10)
    }
})