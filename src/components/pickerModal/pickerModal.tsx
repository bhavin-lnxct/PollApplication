import React from 'react';
import { Text, TouchableOpacity, View } from "react-native"
import Modal from 'react-native-modal';
import colors from '../../theme/colors/colors';
import Icon from '../icon/Icon';
import pickerModalStyle from './pickerModalStyle';

export interface themeButtonProps{
    isVisible?: boolean;
    isVideo: boolean;
    onClose?: () => void;
    onPressCamera?: () => void;
    onPressGallery?:() => void;
}

const PickerModal = ({
    isVisible,
    onClose,
    onPressCamera,
    onPressGallery,
    isVideo,
  }:themeButtonProps) => {
    return(
        <View>
            <Modal
                isVisible={isVisible}
                onBackdropPress={onClose}
                onBackButtonPress={onClose}
                onDismiss={onClose}
                coverScreen={true}
                style={pickerModalStyle.modalContainer}
                useNativeDriver={true}
            >
                <View style={pickerModalStyle.container}>
                <TouchableOpacity
                activeOpacity={0.8}
                    onPress={onPressCamera}
                >
                    <Icon type='Entypo' name='camera' size={50} color={colors.blackShade1B} style={pickerModalStyle.btnImage}/>
                    
                    <Text style={pickerModalStyle.btnText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                activeOpacity={0.8}
                    onPress={onPressGallery}
                >
                    <Icon type='Ionicons' name='folder' size={50} color={colors.blackShade1B} style={pickerModalStyle.btnImage}/>

                    <Text style={pickerModalStyle.btnText}>Gallery</Text>
                </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default PickerModal