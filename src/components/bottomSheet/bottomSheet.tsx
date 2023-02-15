import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../../theme/colors/colors';
import Icon from '../icon/Icon';
import CustomText from '../text/CustomText';
import pickerModalStyle from './bottomSheetStyle';

export interface themeButtonProps {
  isVisible?: boolean;
  isVideo?: boolean;
  onClose?: () => void;
  onPressCamera?: () => void;
  onPressGallery?: () => void;
  children?: React.ReactNode;
  refer?: any;
}

const BottomSheet = ({
  isVisible,
  refer,
  onClose,
  onPressCamera,
  onPressGallery,
  isVideo,
  children,
}: themeButtonProps) => {
  return (
    <View ref={refer}>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        onDismiss={onClose}
        coverScreen={true}
        style={pickerModalStyle.modalContainer}
        onSwipeComplete={onClose}
        swipeDirection={'down'}
        propagateSwipe={true}>
        {children}
      </Modal>
    </View>
  );
};

export default BottomSheet;
