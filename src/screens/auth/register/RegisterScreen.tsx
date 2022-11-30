import React, {useRef, useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ms} from 'react-native-size-matters';
import RegisterScreenStyle from './RegisterScreenStyle';
// import CheckBox from 'react-native-check-box';
import {useNavigation} from '@react-navigation/native';
import ThemeButton from '../../../components/themeButton/themeButton';
import colors from '../../../theme/colors/colors';
import screenNameEnum from '../../../helper/screenNameEnum';
import {removeSpace, showToast} from '../../../helper/helper';
import {Auth} from 'aws-amplify';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import CustomText from '../../../components/text/CustomText';
import FastImage from 'react-native-fast-image';
import images from '../../../theme/images/images';
import Icon from '../../../components/icon/Icon';
import LoginScreenStyle from '../login/LoginScreenStyle';
import {SvgXml} from 'react-native-svg';
import svg from '../../../theme/svg/svg';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [Loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const SignUp = async (
    email: string,
    password: string,
    resetPassword: string,
  ) => {
    Keyboard.dismiss();
    const trimmedEmail = removeSpace(email);

    if (!email || !password || !resetPassword) {
      showToast('please fill all required fields');
      return;
    }

    if (password.length < 6) {
      showToast('password must be minimum 6 character long');
      return;
    }

    if (password !== resetPassword) {
      showToast('password and confirm password does not match');
      return;
    }

    try {
      setLoading(true);
      const res = await Auth.signUp({username: email, password});
      let userId = res?.userSub;
      console.log(userId, 'user id ');
      navigation.navigate(screenNameEnum.VerifyEmailScreen, {
        trimmedEmail,
        userId,
        password,
      });
      setLoading(false);
    } catch (error: any) {
      console.log(error, 'error from sign up');
      let message = error.message;

      if (message === 'Username should be an email.') {
        message = 'Please enter a valid email address';
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
        <FastImage
          source={images.signUp}
          resizeMode={FastImage.resizeMode.cover}
          style={RegisterScreenStyle.imageStyle}
        />
        <CustomText textStyle={RegisterScreenStyle.signUpHeaderTitle}>
          Sign Up
        </CustomText>

        <View style={{marginHorizontal: ms(16), marginTop: ms(50)}}>
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
              secureTextEntry={true}
              cursorColor={colors.AppTheme.Text}
              placeholderTextColor={colors.AppTheme.PlaceholderColor}
              onChangeText={val => setPassword(val)}
            />
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
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
              placeholder="Repeat Password"
              returnKeyType="done"
              onSubmitEditing={() => SignUp(email, password, resetPassword)}
              cursorColor={colors.AppTheme.Text}
              secureTextEntry={true}
              placeholderTextColor={colors.AppTheme.PlaceholderColor}
              onChangeText={val => setResetPassword(val)}
            />
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
          </View>
        </View>
        <ThemeButton
          title="Sign Up"
          loading={Loading}
          onPress={() => {
            SignUp(email, password, resetPassword);
          }}
          containerStyle={{marginHorizontal: ms(16), marginTop: ms(50)}}
        />
        <View style={RegisterScreenStyle.loginButtonContainer}>
          <CustomText textStyle={RegisterScreenStyle.loginButtonText}>
            I already have an account.{' '}
          </CustomText>
          <TouchableOpacity activeOpacity={0.8} onPress={onPressGoToLogin}>
            <CustomText
              textStyle={{
                fontFamily: 'Poppins-Bold',
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
