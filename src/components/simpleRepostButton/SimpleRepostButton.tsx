import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';
import CustomText from '../text/CustomText';
import SimpleRepostButtonStyle from './SimpleRepostButtonStyle';
import {SvgXml} from 'react-native-svg';

export interface SettingButtonProps {
  title?: string;
  onPressButton?: () => void;
  color?: string;
  icon?: any;
  isLoading?: Boolean;
}

const SimpleRepostButton = ({
  title,
  color,
  icon,
  isLoading,
  onPressButton = () => {},
}: SettingButtonProps) => {
  const buttonScreen = () => {
    onPressButton();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={SimpleRepostButtonStyle.settingButton}
      onPress={buttonScreen}>
      <View style={SimpleRepostButtonStyle.buttonTitle}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: ms(50),
            padding: ms(8),
            marginVertical: ms(5),
            marginHorizontal: ms(12),
          }}>
          {icon && <SvgXml xml={icon} height={ms(18)} width={ms(18)} />}
        </View>
        {isLoading ? (
          <ActivityIndicator size="small" color={'black'} />
        ) : (
          <CustomText
            textStyle={{color: colors.AppTheme.Text, fontSize: ms(16)}}>
            {title}
          </CustomText>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SimpleRepostButton;
