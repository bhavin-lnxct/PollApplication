import { TouchableOpacity, View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { SvgXml } from "react-native-svg";
import colors from "../../theme/colors/colors";
import svg from "../../theme/svg/svg";
import BottomSheet from "../bottomSheet/bottomSheet";
import CustomText from "../text/CustomText";

export interface cameraModalProps {
    isVisible?: boolean;
    setIsVisible?: any;
    onPressCamera?: () => void;
    onPressGallery?: () => void;
  }

const CameraModal = ({isVisible,setIsVisible,onPressCamera,onPressGallery}:cameraModalProps) => {
    return(
        <BottomSheet isVisible={isVisible} onClose={() => setIsVisible(false)}>
            <View style={style.container}>
                <TouchableOpacity activeOpacity={0.8} onPress={onPressCamera}>
                    <View style={style.bottomCamera}>
                        <SvgXml xml={svg.BottomCamera} />
                    </View>
                    <CustomText textStyle={style.btnText}>
                        Camera
                    </CustomText>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={onPressGallery}>
                    <View style={style.bottomCamera}>
                        <SvgXml xml={svg.BottomGallery} />
                    </View>
                    <CustomText textStyle={style.btnText}>
                        Gallery
                    </CustomText>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    )
}

export default CameraModal;

const style = ScaledSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: ms(20),
        backgroundColor: colors.AppTheme.Secondary,
        borderTopEndRadius: ms(15),
        borderTopStartRadius: ms(15),
        width: '100%',
        paddingHorizontal: ms(10)
    },
    bottomCamera: {
        backgroundColor: colors.AppTheme.Primary,
        height: ms(60),
        width: ms(60),
        borderRadius: ms(50),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    btnText: {
        marginTop: ms(4),
        fontSize: ms(16),
        color: colors.AppTheme.Text,
        fontFamily: 'DMSans-Medium',
    },
})