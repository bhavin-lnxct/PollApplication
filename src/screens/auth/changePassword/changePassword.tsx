import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../../components/header/header";
import ThemeButton from "../../../components/themeButton/themeButton";
import { showToast } from "../../../helper/helper";
import messages from "../../../helper/messages";
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
            showToast(messages.fillAllFields);
            return;
        }
        if(newPassword.length < 6){
            showToast(messages.passwordMustBe);
            return;
        }
        if(newPassword !== confirmNewPassword){
            showToast(messages.passwordDoesNotMAtch);
            return;
        }

        setIsLoading(true);

        Auth.currentAuthenticatedUser({bypassCache: true})
        .then(user => {
            Auth.changePassword(user,oldPassword,newPassword)
            .then((res)=>{
                showToast(messages.passwordChanged);
                navigation.goBack();
                setOldPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
                setIsLoading(false);
            })
            .catch((err)=>{
                let message = err.message;
                if (message === 'Incorrect username or password.') {
                    message = `${messages.incorrectPassword}`;
                }
                if (message === 'Password did not conform with policy: Password not long enough') 
                {
                    message = `${messages.passwordMustBe}`;
                }
                showToast(message);
                setIsLoading(false);
            })
        })
        .catch((e)=>{
            showToast(e.message);
            setIsLoading(false);
        })
    }

    return(
        <View style={changePasswordStyle.container}>
            <SafeAreaView>
                <Header title="Change Password" isBack={true}/>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
                        <View style={changePasswordStyle.inputContainer}>
                            <TextInput
                                placeholder="Old password"
                                value={oldPassword}
                                onChangeText={val => setOldPassword(val)}
                                placeholderTextColor={colors.AppTheme.PlaceholderColor}
                                style={changePasswordStyle.textInput}
                            />
                            <TextInput
                                placeholder="New password"
                                value={newPassword}
                                onChangeText={val => setNewPassword(val)}
                                placeholderTextColor={colors.AppTheme.PlaceholderColor}
                                style={changePasswordStyle.textInput}
                            />
                            <TextInput
                                placeholder="Confirm new password"
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