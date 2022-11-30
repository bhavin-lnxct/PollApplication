import { ms, ScaledSheet } from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

export default ScaledSheet.create({
    container: { flex: 1 },
    header: { fontSize: ms(16) },
    settingButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginEnd: ms(16),
        marginStart: ms(16),
        color: colors.blackShade02,
        marginTop: ms(8),
        backgroundColor: colors.AppTheme.Secondary,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 10,
    },
    buttonTitle: {
        flexDirection: 'row',
        width: "100%",
        alignItems: 'center',
    },
    rightCornerIcon: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
});
