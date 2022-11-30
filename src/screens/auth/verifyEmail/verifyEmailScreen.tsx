import React, { useState } from 'react';
import { Keyboard, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ms } from 'react-native-size-matters';
import ThemeButton from '../../../components/themeButton/themeButton';
import colors from '../../../theme/colors/colors';
import verifyEmailScreenStyle from './verifyEmailScreenStyle';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { showToast } from '../../../helper/helper';
import screenNameEnum from '../../../helper/screenNameEnum';
import { Query } from '../../../network/Query';
import CustomText from '../../../components/text/CustomText';
import RegisterScreenStyle from '../register/RegisterScreenStyle';
import FastImage from 'react-native-fast-image';
import images from '../../../theme/images/images';
import LoginScreenStyle from '../login/LoginScreenStyle';

const VerifyEmailScreen = () => {

    const route = useRoute();
    const email = route?.params?.trimmedEmail;
    const userId = route?.params?.userId;
    const password = route?.params?.password;
    const navigation = useNavigation();
    const [otp, setOtp] = useState('');
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [resendLoading, setResetLoading] = useState(false);

    const verifyEmail = async (otp: string) => {

        if (!otp) {
            showToast(`OTP can't be empty`);
            return;
        }

        try {

            setVerifyLoading(true);
            Keyboard.dismiss();
            const res = await Auth.confirmSignUp(email, otp);
            if (!!res) {
                const result = await API.graphql(graphqlOperation(Query.createUser, { email: email, user_id: userId }));
                if (!!result) {
                    // showToast('Sign up successfully');
                    navigation.navigate(screenNameEnum.UserInterest, { email, userId });
                }
            }
            setVerifyLoading(false);

        } catch (error) {

            console.log(error, 'error from verify email')
            showToast('wrong confirmation code');
            setVerifyLoading(false);

        }
    }

    const resendCode = async () => {

        try {
            setResetLoading(true);
            const resend = await Auth.resendSignUp(email);
            console.log(resend, 'res from get resend code');
            setResetLoading(false);
            showToast('Code has been resent Successfully, Check Your Email for Code');

        } catch (error: any) {
            console.log(error, 'error from get resend code in verify email screen');
            showToast(error.message);
            setResetLoading(false);
        }

    }

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
            <SafeAreaView style={verifyEmailScreenStyle.container}>
                <View style={{ alignItems: 'center' }}>
                    <FastImage
                        source={images.verificationEmail}
                        resizeMode={FastImage.resizeMode.contain}
                        style={RegisterScreenStyle.imageStyle}
                    />

                </View>
                <CustomText textStyle={LoginScreenStyle.loginHeaderTitle}>Verify Email</CustomText>

                <CustomText textStyle={verifyEmailScreenStyle.verificationCodeTextContainer}>
                    We emailed a code to your email address. {'\n'}Please enter the code
                    to sign in.
                </CustomText>

                <View style={verifyEmailScreenStyle.secondContainer}>
                    <View style={verifyEmailScreenStyle.loginTextInputContainer}>
                        <TextInput
                            onChangeText={val => setOtp(val)}
                            keyboardType="number-pad"
                            maxLength={6}
                            style={LoginScreenStyle.loginFormTextInput}
                            placeholder="Enter Verification Code"
                            placeholderTextColor={colors.grayShadeAB}
                        />
                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={LoginScreenStyle.forgotPasswordContainer} onPress={resendCode}>
                        <CustomText textStyle={{ color: '#F26419', fontSize: ms(15), fontWeight: 'bold' }}>Resend Code</CustomText>
                    </TouchableOpacity>

                </View>
                <View style={{ marginTop: ms(16) }}>
                    <ThemeButton
                        containerStyle={verifyEmailScreenStyle.verifyEmailButton}
                        titleStyle={verifyEmailScreenStyle.resendButtonTitle}
                        loading={verifyLoading}
                        title={'Verify Email'}
                        onPress={() => verifyEmail(otp)}
                    />
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default VerifyEmailScreen;
