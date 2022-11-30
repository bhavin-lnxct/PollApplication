import { ms, ScaledSheet } from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

export default ScaledSheet.create({
    container:{
        flex:1
    },
    inputContainer:{
        marginHorizontal: ms(16),
        marginTop: ms(16)
    },
    textInput:{
        height: ms(50),
        marginTop: ms(10),
        padding: ms(10),
        backgroundColor: '#fff',
        fontSize: ms(13),
        borderColor: colors.AppTheme.PlaceholderColor,
        borderWidth:1,
        borderRadius: ms(10),
        color: 'black',
    },
    buttonContainer:{
        width: '100%'
    },
    buttonView: {
        marginTop: ms(60),
        alignItems:'center'
    }
})