import { ms, ScaledSheet } from "react-native-size-matters";
import colors from "../../../theme/colors/colors";

export default ScaledSheet.create({
    mainContainer:{
        marginBottom:ms(80)
    },
    header:{
        marginTop:ms(16),
        paddingVertical:ms(8),
        paddingHorizontal:ms(16),
        backgroundColor: colors.AppTheme.Secondary
    },
    titleContainer:{
        backgroundColor: colors.AppTheme.Secondary,
        marginVertical: ms(8)
    },
    Title:{
        margin:ms(16),
        fontSize:ms(16),
        fontWeight:'400',
        color: colors.AppTheme.Text
    },
    titleText: {
        marginHorizontal:ms(16),
        fontSize:ms(16),
        fontWeight:'400',
        color: colors.AppTheme.Text,
        marginBottom: ms(8)
    },
    resultCard:{
        backgroundColor: colors.AppTheme.Secondary,
        marginVertical: ms(4)
    },
    questionCard:{
        margin:ms(16)
    },
    questionText:{
        fontSize:ms(16),
        fontWeight:'700',
        color:colors.AppTheme.Text,
        marginBottom:ms(8)
    },
    optionText:{
        fontSize:ms(16),
        fontWeight:'400',
        color: colors.AppTheme.Text,
        marginLeft:ms(8),
        marginRight:ms(8)
    },
    textOption:{
        marginVertical:ms(4),
        height:ms(40),
        borderRadius:ms(5),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    fillTextOption:{
        backgroundColor: colors.AppTheme.OtherSecond,
        borderRadius: ms(5),
        left: 0,
        height: '100%',
        position: 'absolute',
    },
    image:{
        width:ms(150),
        height:ms(100),
        borderRadius:ms(5),
        marginVertical:ms(4)
    }
})