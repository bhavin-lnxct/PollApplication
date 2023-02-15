import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ms} from 'react-native-size-matters';
import ThemeButton from '../../../components/themeButton/themeButton';
import colors from '../../../theme/colors/colors';
import restorePasswordStyle from './restorePasswordStyle';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from '../../../helper/screenNameEnum';
import {removeSpace, showToast, validateEmail} from '../../../helper/helper';
import {Auth} from 'aws-amplify';
import CustomText from '../../../components/text/CustomText';
import LoginScreenStyle from '../login/LoginScreenStyle';
import Icon from '../../../components/icon/Icon';
import messages from '../../../helper/messages';
import {SvgXml} from 'react-native-svg';
import svg from '../../../theme/svg/svg';

const RestorePasswordScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = useState('');

  const goToLoginPage = () => {
    navigation.navigate(screenNameEnum.LoginScreen);
  };

  const sendCode = async (email: string) => {
    const trimmedEmail = removeSpace(email);

    if (!trimmedEmail) {
      showToast(messages.enterEmail);
      return;
    }

    const isValidEmail = validateEmail(trimmedEmail);
    if (isValidEmail === false) {
      showToast('Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      const res = await Auth.forgotPassword(trimmedEmail);
      navigation.navigate(screenNameEnum.VerificationCodeScreen, {
        trimmedEmail,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(
        'ERROR in file: restorePassword.tsx:50 ~ sendCode',
        error.message,
      );
      if (error.message === 'Username/client id combination not found.') {
        showToast('User does not exist');
        return;
      }
      if (
        error.message ===
        'Cannot reset password for the user as there is no registered/verified email or phone_number'
      ) {
        showToast('User does not exist');
        return;
      }
      showToast(error.message);
    }
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
      <SafeAreaView style={restorePasswordStyle.container}>
        <View style={restorePasswordStyle.imageStyleView}>
          <SvgXml xml={svg.AuthResetPassword} />
          <CustomText textStyle={restorePasswordStyle.headerTitle}>
            Restore Password
          </CustomText>
          <CustomText textStyle={restorePasswordStyle.restorePasswordText}>
            Enter your email and we'll send you a code to get back into your
            account.
          </CustomText>
        </View>
        <View
          style={[
            LoginScreenStyle.loginTextInputContainer,
            LoginScreenStyle.loginTextInputMH,
          ]}>
          <Icon type="Fontisto" name="email" size={ms(18)} color={'#7D7D7D'} />
          <TextInput
            onChangeText={val => setEmail(val)}
            style={LoginScreenStyle.loginFormTextInput}
            placeholder="Enter Email Address"
            placeholderTextColor={colors.AppTheme.grayShadeAB}
          />
        </View>
        <View style={{marginTop: ms(25)}}>
          <ThemeButton
            containerStyle={restorePasswordStyle.sendCodeButton}
            titleStyle={restorePasswordStyle.sendCodeButtonTitle}
            title={'Send Code'}
            onPress={() => sendCode(email)}
            loading={isLoading}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={goToLoginPage}
            style={restorePasswordStyle.cancelButton}>
            <CustomText textStyle={{fontSize: ms(16), color: '#fff'}}>
              Cancel
            </CustomText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default RestorePasswordScreen;
