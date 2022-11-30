import { ms, s, ScaledSheet, vs } from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
    container: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        margin: ms(10), 
        alignItems: 'center' 
    },
    titleText: {
        fontSize: ms(16),
        fontWeight: 'bold',
        color: colors.AppTheme.Text,
    },
    TextRight: { 
        marginRight: ms(10) 
    }
})