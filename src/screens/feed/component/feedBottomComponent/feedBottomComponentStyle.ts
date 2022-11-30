import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colors from '../../../../theme/colors/colors';

export default ScaledSheet.create({
    bottomContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12,
    },
    iconContainer:{
        flexDirection: 'row', 
        alignItems: 'center'
    },
    counterText:{
        fontSize: 16, 
        paddingLeft: 6,
        color: colors.AppTheme.Text,
    }
})