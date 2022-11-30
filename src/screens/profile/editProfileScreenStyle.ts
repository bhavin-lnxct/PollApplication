import { ms, s, ScaledSheet, vs } from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

export default ScaledSheet.create({
    container: {
        flex: 1,
    },
    profileImage: {
        width: ms(60),
        height: ms(60),
        borderRadius: 1000,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.grayShadeAB,
        borderColor: colors.AppTheme.Primary,
    },
    cameraIcon: {
        opacity: 0.8
    },
    renderViewContainer: {
        flex: 1,
        marginHorizontal: ms(16),
        marginBottom: ms(80)
    },
    usernameTxtStyle: {
        color: colors.AppTheme.Text,
        fontFamily: 'Poppins-Medium',
        paddingRight: ms(10),
    },
    textInputView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        borderColor: colors.grayShadeAB,
        borderWidth: ms(1),
        borderRadius: ms(4),
        fontSize: ms(14),
        marginTop: ms(10),
        marginRight: ms(16),
        paddingLeft: ms(16),
        textAlignVertical: 'center',
        height: ms(40),
        width: '100%',
        color: colors.AppTheme.Text,
        fontFamily: 'Poppins-Medium',
    },
    textInputViewNew: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: '#FFF',
        width: '100%',
        borderRadius: ms(10),
        height: ms(50),
        marginTop: ms(16),
    },
    textInputDropDown: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: '#FFF',
        height: ms(50),
        marginTop: ms(16),
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: ms(10),
    },
    textInputNew: {
        fontSize: ms(14),
        width: '100%',
        paddingHorizontal: ms(12),
        color: colors.AppTheme.Text,
        fontFamily: 'Poppins-Medium',
    },
    dateViewInput: {
        height: ms(40),
        paddingLeft: ms(16),
        paddingRight: ms(16),
        borderColor: colors.grayShadeAB,
        justifyContent: 'center',
        borderWidth: ms(1),
        borderRadius: ms(4),
        marginTop: ms(10)
    },
    dateText: {
        fontSize: ms(14),
        color: colors.AppTheme.Text,
        fontFamily: 'Poppins-Medium',
    },
    genderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: ms(3),
    },
    genderText: {
        color: colors.AppTheme.Text,
        fontFamily: 'Poppins-Medium',
        marginHorizontal: ms(5)
    },
    aboutTextInput: {
        fontSize: ms(14),
        marginRight: ms(16),
        paddingLeft: ms(16),
        color: colors.AppTheme.Text,
        fontFamily: 'Poppins-Medium',
    },
    aboutTextInputView: {
        height: ms(100),
        alignItems: 'flex-start',
    },
    interstedItemContainer: {
        marginTop: ms(16),
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    interestItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: ms(50),
        padding: ms(8),
        paddingHorizontal: ms(10),
        margin: ms(5),
    },
    labelItem: {
        marginHorizontal: ms(5),
        fontSize: ms(14),
        color: colors.AppTheme.Secondary,
    },
    profileContainer: {
        backgroundColor: colors.AppTheme.Secondary,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        flexDirection: 'row',
        marginTop: ms(16),
        marginHorizontal: ms(12),
        borderRadius: ms(10),
        alignItems: 'center',
        flex: 1,
        paddingTop: ms(10),
        paddingBottom: ms(16),
        paddingHorizontal: ms(12),
    },
    profileTitle: {
        fontSize: ms(17),
        fontFamily: 'Poppins-Bold',
        color: colors.AppTheme.Text,
        marginHorizontal: ms(12),
    },
    gender: {
        fontSize: ms(14),
        width: '100%',
        paddingHorizontal: ms(12),
        flex: 1,
        alignItems: 'center',
    },
    containerDropDwon: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
        color: colors.AppTheme.Text,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: colors.AppTheme.Text,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    interstedTxtStyle: {
        color: '#7D7D7D',
        fontSize: ms(16),
        fontWeight: 'bold',
    },
    editLogo: {
        paddingLeft: ms(5),
    },

    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editText: {
        fontSize: ms(16),
        fontFamily: 'Poppins-Bold',
        color: colors.AppTheme.Text,
    },

})