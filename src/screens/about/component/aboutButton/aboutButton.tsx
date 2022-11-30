import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Icon from '../../../../components/icon/Icon';
import aboutButtonStyle from './aboutButtonStyle';

export interface AboutButtonProps {
  title?: string;
  onPressButton?: () => void;
}

const AboutButton = ({title, onPressButton}: AboutButtonProps) => {
    return(
        <TouchableOpacity activeOpacity={0.8} style={aboutButtonStyle.settingButton} onPress={onPressButton}>
          <Text style={aboutButtonStyle.buttonTitle}>{title}</Text>
          <Icon  size={14} style={aboutButtonStyle.rightCornerIcon} type={'AntDesign'} name={'right'}/>
        </TouchableOpacity>
    );
};

export default AboutButton;