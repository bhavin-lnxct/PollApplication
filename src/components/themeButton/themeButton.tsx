import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import ThemeButtonStyle from './themeButtonStyle';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors/colors';
import CustomText from '../text/CustomText';

export interface themeButtonProps {
  title?: string;
  loading?: boolean;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  ref?: any;
  onPress: () => void;
}

const ThemeButton = ({
  title = 'Button',
  loading = false,
  containerStyle,
  titleStyle,
  onPress,
  disabled = false,
  ref,
}: themeButtonProps) => {
  return (
    <TouchableOpacity
      ref={ref}
      style={[ThemeButtonStyle.container, containerStyle]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={loading || disabled}>
      <LinearGradient
        start={{x: 0.0, y: 2.5}}
        end={{x: 1.5, y: 2.5}}
        locations={[0, 0.5]}
        colors={['#7292C1', '#7292C1']}
        style={ThemeButtonStyle.linearGradientContainer}>
        {loading ? (
          <ActivityIndicator size="small" color={colors?.AppTheme.Secondary} />
        ) : (
          <CustomText textStyle={[ThemeButtonStyle.titleTextStyle, titleStyle]}>
            {title}
          </CustomText>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ThemeButton;
