import { ms, ScaledSheet } from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

export default ScaledSheet.create({
    container: { flex: 1 },
    header: { fontSize: ms(16) },
    settingButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginEnd: ms(16),
        // marginStart: ms(16),
        color: colors.AppTheme.blackShade02,
        
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
