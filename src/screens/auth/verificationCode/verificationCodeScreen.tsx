import {useNavigation, useRoute} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import {debounce} from 'lodash';
import React, {useState} from 'react';
import {SafeAreaView, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ms} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';
import Icon from '../../../components/icon/Icon';
import CustomText from '../../../components/text/CustomText';
import ThemeButton from '../../../components/themeButton/themeButton';
import {showToast} from '../../../helper/helper';
import messages from '../../../helper/messages';
import screenNameEnum from '../../../helper/screenNameEnum';
import colors from '../../../theme/colors/colors';
import svg from '../../../theme/svg/svg';
import LoginScreenStyle from '../login/LoginScreenStyle';
import verificationCodeStyle from './verificationCodeStyle';

const VerificationCodeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verifyLoading, setVerifyLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(true);
  const [showPasswordSecond, setShowPasswordSecond] = useState(true);

  const verifyCode = async (code: string) => {
    if (!code || !password || !confirmPassword) {
      showToast(messages.fillAllFields);
      return;
    }

    if (code.length < 6) {
      showToast(messages.enterCorrectOtp);
      return;
    }

    if (password.length < 6) {
      showToast(messages.passwordMustBe);
      return;
    }

    if (password !== confirmPassword) {
      showToast(messages.passwordDoesNotMAtch);
      return;
    }

    try {
      setVerifyLoading(true);
      const res = await Auth.forgotPasswordSubmit(
        route?.params?.trimmedEmail,
        code,
        password,
      );
      navigation.navigate(screenNameEnum.LoginScreen);
      setVerifyLoading(false);
    } catch (err) {
      console.log(
        'ERROR in file: verificationCodeScreen.tsx:69 ~ verifyCode',
        err.message,
      );
      setVerifyLoading(false);
      const error = JSON.parse(JSON.stringify(err));
      if (error?.code === 'LimitExceededException') {
        showToast(messages.attemptLimit);
      } else {
        showToast(messages.invalidConfirmationCode);
      }
    }
  };

  const resendCode = () => {
    try {
      const data = Auth.forgotPassword(route?.params?.trimmedEmail);
      showToast(messages.resendOtp);
    } catch (error) {
      console.log(
        'ERROR in file: verificationCodeScreen.tsx:90 ~ resendCode',
        error.message,
      );
      if (error?.code === 'LimitExceededException') {
        showToast(messages.attemptLimit);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      style={verificationCodeStyle.container}>
      <SafeAreaView>
        <View style={verificationCodeStyle.imageStyleView}>
          <SvgXml xml={svg.AuthPassword} />
          <CustomText textStyle={verificationCodeStyle.headerTitle}>
            Restore Password
          </CustomText>
          <CustomText textStyle={verificationCodeStyle.verificationCodeText}>
            Enter 6-Digit Verification Code.
          </CustomText>
        </View>
        <View style={{marginHorizontal: ms(16), marginTop: ms(40)}}>
          <View style={LoginScreenStyle.loginTextInputContainer}>
            <TextInput
              keyboardType="number-pad"
              onChangeText={val => setCode(val)}
              maxLength={6}
              style={verificationCodeStyle.loginFormTextInput}
              placeholder="Enter Verification Code"
              placeholderTextColor={colors.AppTheme.grayShadeAB}
            />
          </View>
          <View style={LoginScreenStyle.loginTextInputContainer}>
            <TextInput
              onChangeText={val => setPassword(val)}
              secureTextEntry={showPassword}
              style={verificationCodeStyle.loginFormTextInput}
              placeholder="New Password"
              placeholderTextColor={colors.AppTheme.grayShadeAB}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={{top: 10, bottom: 10, left: 20, right: 10}}
              style={{position: 'absolute', right: 0}}
              onPress={() => setShowPassword(!showPassword)}>
              <Icon
                type="Feather"
                name={`${showPassword ? 'eye' : 'eye-off'}`}
                size={ms(18)}
                color={'#7D7D7D'}
              />
            </TouchableOpacity>
          </View>
          <View style={LoginScreenStyle.loginTextInputContainer}>
            <TextInput
              onChangeText={val => setConfirmPassword(val)}
              secureTextEntry={showPasswordSecond}
              style={verificationCodeStyle.loginFormTextInput}
              placeholder="Confirm New Password"
              placeholderTextColor={colors.AppTheme.grayShadeAB}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={{top: 10, bottom: 10, left: 20, right: 10}}
              style={{position: 'absolute', right: 0}}
              onPress={() => setShowPasswordSecond(!showPasswordSecond)}>
              <Icon
                type="Feather"
                name={`${showPasswordSecond ? 'eye' : 'eye-off'}`}
                size={ms(18)}
                color={'#7D7D7D'}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={LoginScreenStyle.forgotPasswordContainer}
            onPress={debounce(() => resendCode(), 200)}>
            <CustomText
              textStyle={{
                color: '#F26419',
                fontSize: ms(15),
                fontWeight: 'bold',
              }}>
              Resend Code
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: ms(30)}}>
          <ThemeButton
            containerStyle={verificationCodeStyle.resendButton}
            titleStyle={verificationCodeStyle.resendButtonTitle}
            title={'Verify'}
            onPress={() => verifyCode(code)}
            loading={verifyLoading}
          />
          <CustomText
            textStyle={verificationCodeStyle.verificationCodeTextContainer}>
            This verification code is valid for the next {'\n'}10 minutes.
          </CustomText>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default VerificationCodeScreen;
