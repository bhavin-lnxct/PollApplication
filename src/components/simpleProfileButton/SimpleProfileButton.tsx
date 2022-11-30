import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import SimpleProfileButtonStyle from './SimpleProfileButtonStyle'
import Icon from '../icon/Icon';
import { ms } from 'react-native-size-matters';
import colors from '../../theme/colors/colors';
import CustomText from '../text/CustomText';



export interface SettingButtonProps {
    title: string;
    frontIcon: string
    onPressButton?: () => void;
    color: string,
}


const SimpleProfileButton = ({
    title,
    color,
    frontIcon = "hearto",
    onPressButton = () => { },

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
                <View style={{ backgroundColor: color, borderRadius: ms(50), padding: ms(8), marginVertical: ms(5), marginHorizontal: ms(12) }}>
                    <Icon
                        size={24}
                        style={SimpleProfileButtonStyle.rightCornerIcon}
                        name={frontIcon}
                        type={'MaterialIcons'}
                        color={colors.AppTheme.Secondary}
                    />
                </View>
                <CustomText textStyle={{
                    color: colors.blackShade02,
                    fontSize: ms(16),
                }}>{title}</CustomText></View>
        </TouchableOpacity>
    )
}

export default SimpleProfileButton