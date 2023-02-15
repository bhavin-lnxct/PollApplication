import { ms, ScaledSheet } from "react-native-size-matters";
import colors from "../../theme/colors/colors";


export default ScaledSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: ms(45),
        width: ms(45),
        borderRadius: ms(50),
    },
    textContainer: {
        paddingLeft: ms(14),
    },
    title: {
        color: colors.AppTheme.Text,
        fontSize: ms(16),
        fontFamily: 'DMSans-Medium',
    },
    description: {
        color: colors.AppTheme.blackShade50,
        fontSize: ms(12),
        marginTop: ms(8),
    },
})