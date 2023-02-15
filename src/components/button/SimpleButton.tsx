import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import SimpleButtonStyle from './SimpleButtonStyle';
import {buttonProps} from './models/buttonProps';
import CustomText from '../text/CustomText';

const SimpleButton = ({
  title = 'Button',
  loading = false,
  loadingColor = '#fff',
  containerStyle = {},
  buttonTitleStyle,
  onPress,
}: buttonProps) => {
  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color={loadingColor} />
      ) : (
        <CustomText
          textStyle={[SimpleButtonStyle.buttonTitle, buttonTitleStyle]}>
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default SimpleButton;
