import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import SimpleProfileButtonStyle from './SimpleProfileButtonStyle';
import Icon from '../icon/Icon';
import {ms} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';
import CustomText from '../text/CustomText';
import {SvgXml} from 'react-native-svg';

export interface SettingButtonProps {
  title: string;
  onPressButton?: () => void;
  icon: any;
}

const SimpleProfileButton = ({
  title,
  icon,

  onPressButton = () => {},
}: SettingButtonProps) => {
  const buttonScreen = () => {
    onPressButton();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={SimpleProfileButtonStyle.settingButton}
      onPress={buttonScreen}>
      <View style={SimpleProfileButtonStyle.buttonTitle}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: ms(50),
            padding: ms(8),
          }}>
          <SvgXml xml={icon} height={ms(18)} width={ms(18)} />
        </View>
        <CustomText
          textStyle={{
            color: colors.AppTheme.blackShade02,
            fontSize: ms(16),
          }}>
          {title}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default SimpleProfileButton;
