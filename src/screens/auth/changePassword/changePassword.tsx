import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../../components/header/header";
import ThemeButton from "../../../components/themeButton/themeButton";
import { showToast } from "../../../helper/helper";
import colors from "../../../theme/colors/colors";
import changePasswordStyle from "./changePasswordStyle";

const ChangePassword = () => {

    const navigation = useNavigation();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onPressChangePassword = () => {

        if(!oldPassword || !newPassword || !confirmNewPassword){
            showToast('fill all the fields');
            return;
        }
        if(newPassword.length < 6){
            showToast('password must be minimum 6 character long');
            return;
        }
        if(newPassword !== confirmNewPassword){
            showToast(`new password and confirm password doesn't match`);
            return;
        }

        setIsLoading(true);

        Auth.currentAuthenticatedUser({bypassCache: true})
        .then(user => {
            // console.log(user, 'user')
            Auth.changePassword(user,oldPassword,newPassword)
            .then((res)=>{
                showToast('password has been successfully changed');
                navigation.goBack();
                setOldPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
                setIsLoading(false);
            })
            .catch((err)=>{
                let message = err.message;
                if (message === 'Incorrect username or password.') {
                    message = 'Incorrect password.';
                }
                if (message === 'Password did not conform with policy: Password not long enough') 
                {
                    message = 'Password must be six characters long';
                }
                showToast(message);
                setIsLoading(false);
            })
        })
        .catch((e)=>{
            console.log(e.message);
            showToast(e.message);
            setIsLoading(false);
        })
    }

    return(
        <View style={changePasswordStyle.container}>
            <SafeAreaView>
                <Header title="Change Password" isBack={true}/>
                    <KeyboardAwareScrollView>
                        <View style={changePasswordStyle.inputContainer}>
                            <TextInput
                                placeholder="Enter Old Password"
                                value={oldPassword}
                                onChangeText={val => setOldPassword(val)}
                                placeholderTextColor={colors.AppTheme.PlaceholderColor}
                                style={changePasswordStyle.textInput}
                            />
                            <TextInput
                                placeholder="Set New Password"
                                value={newPassword}
                                onChangeText={val => setNewPassword(val)}
                                placeholderTextColor={colors.AppTheme.PlaceholderColor}
                                style={changePasswordStyle.textInput}
                            />
                            <TextInput
                                placeholder="Confirm New Password"
                                value={confirmNewPassword}
                                onChangeText={val => setConfirmNewPassword(val)}
                                placeholderTextColor={colors.AppTheme.PlaceholderColor}
                                style={changePasswordStyle.textInput}
                            />
                            <View style={changePasswordStyle.buttonView}>
                                <ThemeButton 
                                    loading={isLoading} 
                                    title={'Change Password'} 
                                    containerStyle={changePasswordStyle.buttonContainer}
                                    onPress={onPressChangePassword}
                                />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
            </SafeAreaView>
        </View>
    )
}

export default ChangePassword;