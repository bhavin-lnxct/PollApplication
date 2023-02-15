import { ms, ScaledSheet } from "react-native-size-matters";
import colors from "../../theme/colors/colors";

export default ScaledSheet.create({

    titleContainer:{
        backgroundColor: colors.AppTheme.Secondary,
        padding: ms(16),
        marginTop:ms(24)
    },
    titleText:{
        marginLeft:ms(8),
        fontSize:ms(16),
        fontWeight:'400',
        color:colors.AppTheme.Text
    },
    titleInput:{
        padding:ms(8),
        color: colors.AppTheme.Text,
        height: ms(40),
        fontSize: ms(16),
        fontWeight: '400',
        width:'100%',
        borderBottomWidth: 1,
        borderColor: colors.AppTheme.PlaceholderColor,
    },
    container:{
        marginTop:ms(10),
        marginBottom:ms(80)
    },
    cardContainer:{
        borderRadius: ms(10),
        backgroundColor: colors.AppTheme.Secondary,
        paddingHorizontal: ms(16),
        marginVertical:ms(6),
    },
    QuestionContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    deleteIcon:{
        margin:ms(16)
    },
    questionInput:{
        color: colors.AppTheme.Text,
        marginVertical: ms(4),
        height: ms(40),
        padding: ms(8),
        fontSize: ms(16),
        fontWeight: '400',
        width:'88%',
        borderBottomWidth: 1,
        borderColor: colors.AppTheme.PlaceholderColor,
    },
    addIconContainer:{
        alignItems:'center',
        marginVertical: ms(10)
    },
    createButton:{
        marginHorizontal:ms(50),
        borderRadius: ms(10),
        position:'absolute',
        bottom:15,
        left:0,
        right:0
    },
   
})