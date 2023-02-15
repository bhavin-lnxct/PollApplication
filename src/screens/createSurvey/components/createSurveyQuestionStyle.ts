import { ms, ScaledSheet } from "react-native-size-matters"
import colors from "../../../theme/colors/colors"

export default ScaledSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionInput: {
        color: colors.AppTheme.Text,
        marginVertical: ms(4),
        height: ms(40),
        padding: ms(8),
        fontSize: ms(16),
        fontWeight: '400',
        borderBottomWidth: 0.30,
        borderColor: '#545454',
        width: '75%'
    },
    AddOption:{
        color: colors.AppTheme.OtherFirst,
        fontSize:ms(16),
        fontFamily: 'DMSans-Bold',
        marginVertical: ms(4),
        padding: ms(8),
    },
    previewImage:{
        height: ms(100),
        width:ms(150),
        borderRadius:ms(5),
    },
    closeIcon:{
        padding:ms(2),
        borderRadius:ms(20),
        backgroundColor: colors.AppTheme.Secondary,
        opacity: 0.7,
        position:'absolute',
        top:5,
        right:5,
    }
})
