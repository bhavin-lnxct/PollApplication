import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colors from '../../../../theme/colors/colors';

export default ScaledSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userProfileContainer:{
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    image:{
        height: ms(35), 
        width: ms(35), 
        borderRadius: ms(50)
    },
    textContainer:{ 
        paddingLeft: ms(10) 
    },
    title:{
        color: colors.AppTheme.Text,
        fontSize: 15,
        fontFamily: 'Poppins-Bold',
    },
    description:{
        color: colors.blackShade50,
        fontSize: 14,
        paddingTop: ms(4),
    }
})