import { ms, ScaledSheet } from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

export default ScaledSheet.create({
    container: { flex: 1 },
    header: { fontSize: ms(16) },
    settingButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginStart: ms(16),
        color: colors.AppTheme.blackShade02,
        marginTop: ms(8),
    },
    buttonTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightCornerIcon: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
});
