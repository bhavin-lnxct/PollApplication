import {View, Text, StyleProp, TextStyle} from 'react-native';
import React from 'react';

export interface CustomTextInterface {
  textStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
  onPress?: () => {};
}

const CustomText = ({children, textStyle, onPress}: CustomTextInterface) => {
  return (
    <Text
      onPress={onPress}
      style={[{fontFamily: 'Poppins-Regular'}, textStyle]}>
      {children}
    </Text>
  );
};

export default CustomText;
