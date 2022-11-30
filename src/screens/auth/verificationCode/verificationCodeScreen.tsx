import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { debounce } from 'lodash';
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ms } from 'react-native-size-matters';
import Icon from '../../../components/icon/Icon';
import CustomText from '../../../components/text/CustomText';
import ThemeButton from '../../../components/themeButton/themeButton';
import { showToast } from '../../../helper/helper';
import screenNameEnum from '../../../helper/screenNameEnum';
import colors from '../../../theme/colors/colors';
import images from '../../../theme/images/images';
import LoginScreenStyle from '../login/LoginScreenStyle';
import RegisterScreenStyle from '../register/RegisterScreenStyle';
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
			showToast('please fill all required fields');
			return;
		}

		if (password !== confirmPassword) {
			showToast('password and confirm password does not match');
			return;
		}

		if (password.length < 6) {
			showToast('password must be minimum 6 character long');
			return;
		}

		try {

			setVerifyLoading(true)
			const res = await Auth.forgotPasswordSubmit(route?.params?.trimmedEmail, code, password);
			console.log(res, 'res');
			navigation.navigate(screenNameEnum.LoginScreen);
			setVerifyLoading(false);

		} catch (err) {

			setVerifyLoading(false);
			const error = JSON.parse(JSON.stringify(err));
			if (error?.code === 'LimitExceededException') {
				showToast('Attempt Limit Exceeded, Try Again after Some time');
			} else {
				showToast('Invalid verification code, please check your email and try again.');
			}

		}
	}

	const resendCode = () => {

		try {

			console.log('resend code clicked');
			const data = Auth.forgotPassword(route?.params?.trimmedEmail);
			console.log(data, 'data');
			showToast('We Have Send OTP , Check your email ')

		} catch (error: any) {

			if (error?.code === 'LimitExceededException') {
				showToast('Attempt Limit Exceeded, Try Again after Some time');
			}

		}
	}

	return (
		<KeyboardAwareScrollView keyboardShouldPersistTaps="always" style={verificationCodeStyle.container}>
			<SafeAreaView>
				<View style={{ alignItems: 'center', }}>

					<FastImage
						source={images.restoreSecond}
						resizeMode={FastImage.resizeMode.contain}
						style={RegisterScreenStyle.imageStyle}
					/>
					<CustomText textStyle={verificationCodeStyle.headerTitle}>
						Restore Password
					</CustomText>
					<CustomText textStyle={verificationCodeStyle.verificationCodeText}>
						Enter 6-Digit Verification Code.
					</CustomText>
				</View>
				<View style={{ marginHorizontal: ms(16), marginTop: ms(40) }}>

					<View style={LoginScreenStyle.loginTextInputContainer}>
						<TextInput
							keyboardType="number-pad"
							onChangeText={val => setCode(val)}
							style={verificationCodeStyle.loginFormTextInput}
							placeholder="Enter Verification Code"
							placeholderTextColor={colors.grayShadeAB}
						/>
					</View>
					<View style={LoginScreenStyle.loginTextInputContainer}>
						<TextInput
							onChangeText={val => setPassword(val)}
							secureTextEntry={showPassword}
							style={verificationCodeStyle.loginFormTextInput}
							placeholder="New Password"
							placeholderTextColor={colors.grayShadeAB}
						/>
						<TouchableOpacity activeOpacity={0.8} hitSlop={{ top: 10, bottom: 10, left: 20, right: 10 }} style={{ position: 'absolute', right: 0 }} onPress={() => setShowPassword(!showPassword)}>
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
							placeholderTextColor={colors.grayShadeAB}
						/>

						<TouchableOpacity activeOpacity={0.8} hitSlop={{ top: 10, bottom: 10, left: 20, right: 10 }} style={{ position: 'absolute', right: 0 }} onPress={() => setShowPasswordSecond(!showPasswordSecond)}>
							<Icon
								type="Feather"
								name={`${showPasswordSecond ? 'eye' : 'eye-off'}`}
								size={ms(18)}
								color={'#7D7D7D'}
							/>
						</TouchableOpacity>
					</View>

					<TouchableOpacity activeOpacity={0.8} style={LoginScreenStyle.forgotPasswordContainer} onPress={debounce(() => resendCode(), 200)}  >
						<CustomText textStyle={{ color: '#F26419', fontSize: ms(15), fontWeight: 'bold' }}>Resend Code</CustomText>
					</TouchableOpacity>

				</View>
				<View style={{ marginTop: ms(30) }}>
					<ThemeButton
						containerStyle={verificationCodeStyle.resendButton}
						titleStyle={verificationCodeStyle.resendButtonTitle}
						title={'Verify'}
						onPress={() => verifyCode(code)}
						loading={verifyLoading}
					/>
					<CustomText textStyle={verificationCodeStyle.verificationCodeTextContainer}>
						This verification code is valid for the next {'\n'}10 minutes.
					</CustomText>
				</View>
			</SafeAreaView>
		</KeyboardAwareScrollView>
	)
}

export default VerificationCodeScreen