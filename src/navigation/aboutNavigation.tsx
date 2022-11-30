import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNameEnum from '../helper/screenNameEnum';
import DataPolicy from '../screens/about/dataPolicy/dataPolicy';
import AboutDetailScreen from '../screens/about/aboutDetailScreen';
import LegalScreen from '../screens/about/legalScreen/legalScreen';
import PrivacyPolicy from '../screens/about/privacyPolicy/privacyPolicy';
import EulaAgreement from '../screens/about/eulaAgreement/eulaAgreement';
import TermsOfUse from '../screens/about/termsOfUse/termsOfUse';

const About = createNativeStackNavigator();

const AboutNavigation = () => {
    return (
        <About.Navigator initialRouteName={screenNameEnum.AboutDetailScreen}>
            <About.Screen
                name={screenNameEnum.AboutDetailScreen}
                component={AboutDetailScreen}
                options={{headerShown: false}}
            />
            <About.Screen
                name={screenNameEnum.LegalScreen}
                component={LegalScreen}
                options={{headerShown: false}}
            />
            <About.Screen
                name={screenNameEnum.DataPolicy}
                component={DataPolicy}
                options={{headerShown: false}}
            />
            <About.Screen
                name={screenNameEnum.PrivacyPolicy}
                component={PrivacyPolicy}
                options={{headerShown: false}}
            />
            <About.Screen
                name={screenNameEnum.EulaAgreement}
                component={EulaAgreement}
                options={{headerShown: false}}
            />
            <About.Screen
                name={screenNameEnum.TermsOfUse}
                component={TermsOfUse}
                options={{headerShown: false}}
            />
        </About.Navigator>
    )
}

export default AboutNavigation;