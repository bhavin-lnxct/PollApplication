import {View, Text, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';

export interface CustomTextInterface {
  textStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
  onPress?: () => {};
}

const CustomText = ({children, textStyle, onPress}: CustomTextInterface) => {
  return (
    <Text
      onPress={onPress}
      style={[{fontFamily: 'DMSans-Regular', fontSize:ms(16)}, textStyle]}>
      {children}
    </Text>
  );
};

export default CustomText;
