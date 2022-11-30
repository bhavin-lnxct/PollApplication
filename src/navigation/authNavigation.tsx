import React from 'react';
import {Text, View} from 'react-native';
import screenNameEnum from '../helper/screenNameEnum';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/login/LoginScreen';
import RegisterScreen from '../screens/auth/register/RegisterScreen';
import VerifyEmailScreen from '../screens/auth/verifyEmail/verifyEmailScreen';
import RestorePasswordScreen from '../screens/auth/resorePassword/restorePassword';
import VerificationCodeScreen from '../screens/auth/verificationCode/verificationCodeScreen';
import UserInterest from '../screens/auth/userInterest/userInterest';

const AuthStack = createNativeStackNavigator();

const routes = [
  {
    route: screenNameEnum.LoginScreen,
    label: 'LoginScreen',
    component: LoginScreen,
  },
  {
    route: screenNameEnum.RegisterScreen,
    label: 'RegisterScreen',
    component: RegisterScreen,
  },
  {
    route: screenNameEnum.VerifyEmailScreen,
    label: 'VerifyEmailScreen',
    component: VerifyEmailScreen,
  },
  {
    route: screenNameEnum.RestorePasswordScreen,
    label: 'RestorePasswordScreen',
    component: RestorePasswordScreen,
  },
  {
    route: screenNameEnum.VerificationCodeScreen,
    label: 'VerificationCodeScreen',
    component: VerificationCodeScreen,
  },
  {
    route: screenNameEnum.UserInterest,
    label: 'UserInterest',
    component: UserInterest,
  },
];

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator>
      {routes.map(item => {
        return (
          <AuthStack.Screen
            key={item.label}
            name={item.route}
            component={item.component}
            options={{headerShown: false}}
          />
        );
      })}
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
