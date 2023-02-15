import React, {useRef, useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ms} from 'react-native-size-matters';
import RegisterScreenStyle from './RegisterScreenStyle';
import {useNavigation} from '@react-navigation/native';
import ThemeButton from '../../../components/themeButton/themeButton';
import colors from '../../../theme/colors/colors';
import screenNameEnum from '../../../helper/screenNameEnum';
import {removeSpace, showToast, validateEmail} from '../../../helper/helper';
import {Auth} from 'aws-amplify';
import CustomText from '../../../components/text/CustomText';
import Icon from '../../../components/icon/Icon';
import LoginScreenStyle from '../login/LoginScreenStyle';
import messages from '../../../helper/messages';
import {SvgXml} from 'react-native-svg';
import svg from '../../../theme/svg/svg';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [Loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = useState(true);
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const SignUp = async (
    email: string,
    password: string,
    resetPassword: string,
  ) => {
    Keyboard.dismiss();
    const trimmedEmail = removeSpace(email);

    if (!trimmedEmail || !password || !resetPassword) {
      showToast(messages.fillAllFields);
      return;
    }

    const isValidEmail = validateEmail(trimmedEmail);
    if (isValidEmail === false) {
      showToast(messages.enterValidEmail);
      return;
    }

    if (password.length < 6) {
      showToast(messages.passwordMustBe);
      return;
    }

    if (password !== resetPassword) {
      showToast(messages.passwordDoesNotMAtch);
      return;
    }

    try {
      setLoading(true);
      const res = await Auth.signUp({username: trimmedEmail, password});
      let userId = res?.userSub;
      navigation.navigate(screenNameEnum.VerifyEmailScreen, {
        trimmedEmail,
        userId,
        password,
      });
      setLoading(false);
    } catch (error) {
      console.log(
        'ERROR in file: RegisterScreen.tsx:70 ~ RegisterScreen',
        error.message,
      );
      let message = error.message;

      if (message === 'Username should be either an email or a phone number.') {
        message = `${messages.enterValidEmail}`;
      }

      showToast(message);
      setLoading(false);
    }
  };

  const onPressGoToLogin = () => {
    navigation.navigate(screenNameEnum.LoginScreen);
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
      <SafeAreaView style={RegisterScreenStyle.container}>
        <View style={RegisterScreenStyle.imageStyleView}>
          <SvgXml xml={svg.AuthSignUp} />
          <CustomText textStyle={RegisterScreenStyle.signUpHeaderTitle}>
            Sign Up
          </CustomText>
        </View>
        <View style={RegisterScreenStyle.authMainBox}>
          <View style={LoginScreenStyle.loginTextInputContainer}>
            <Icon
              type="Fontisto"
              name="email"
              size={ms(18)}
              color={'#7D7D7D'}
            />
            <TextInput
              style={LoginScreenStyle.loginFormTextInput}
              placeholder="Email"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              cursorColor={colors.AppTheme.Text}
              placeholderTextColor={colors.AppTheme.PlaceholderColor}
              onChangeText={val => setEmail(val)}
            />
          </View>
          <View style={LoginScreenStyle.loginTextInputContainer}>
            <Icon
              type="Ionicons"
              name="key-outline"
              size={ms(18)}
              color={'#7D7D7D'}
            />
            <TextInput
              ref={passwordRef}
              style={LoginScreenStyle.loginFormTextInput}
              placeholder="Create Password"
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              secureTextEntry={showPassword}
              cursorColor={colors.AppTheme.Text}
              placeholderTextColor={colors.AppTheme.PlaceholderColor}
              onChangeText={val => setPassword(val)}
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
            <Icon
              type="Ionicons"
              name="key-outline"
              size={ms(18)}
              color={'#7D7D7D'}
            />
            <TextInput
              ref={confirmPasswordRef}
              style={LoginScreenStyle.loginFormTextInput}
              placeholder="Confirm Password"
              returnKeyType="done"
              onSubmitEditing={() => SignUp(email, password, resetPassword)}
              cursorColor={colors.AppTheme.Text}
              secureTextEntry={showRepeatPassword}
              placeholderTextColor={colors.AppTheme.PlaceholderColor}
              onChangeText={val => setResetPassword(val)}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={{top: 10, bottom: 10, left: 20, right: 10}}
              style={{position: 'absolute', right: 0}}
              onPress={() => setShowRepeatPassword(!showRepeatPassword)}>
              <Icon
                type="Feather"
                name={`${showRepeatPassword ? 'eye' : 'eye-off'}`}
                size={ms(18)}
                color={'#7D7D7D'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ThemeButton
          title="Sign Up"
          loading={Loading}
          onPress={() => {
            SignUp(email, password, resetPassword);
          }}
          containerStyle={RegisterScreenStyle.signupButton}
        />
        <View style={RegisterScreenStyle.loginButtonContainer}>
          <CustomText textStyle={RegisterScreenStyle.loginButtonText}>
            I already have an account.{' '}
          </CustomText>
          <TouchableOpacity activeOpacity={0.8} onPress={onPressGoToLogin}>
            <CustomText
              textStyle={{
                fontFamily: 'DMSans-Bold',
                fontSize: ms(14),
                color: colors.AppTheme.Text,
              }}>
              Login
            </CustomText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;
