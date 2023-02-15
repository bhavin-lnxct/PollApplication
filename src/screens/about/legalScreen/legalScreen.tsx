import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from '../../../helper/screenNameEnum';
import legalScreenStyle from './legalScreenStyle';
import Header from '../../../components/header/header';
import AboutButton from '../component/aboutButton/aboutButton';

const LegalScreen = () => {
  const navigation = useNavigation();

  const onPressDataPolicy = () => {
    navigation.navigate(screenNameEnum.DataPolicy);
  };
  const EULAAgreement = () => {
    navigation.navigate(screenNameEnum.EulaAgreement);
  };
  const PrivacyPolicy = () => {
    navigation.navigate(screenNameEnum.PrivacyPolicy);
  };
  const TermsofUse = () => {
    navigation.navigate(screenNameEnum.TermsOfUse);
  };
  return (
    <SafeAreaView style={legalScreenStyle.container}>
      <Header title="Legal" isBack={true} isNotification={true} />
      <View style={legalScreenStyle.mainContainer}>
        <AboutButton
          aboutStyle={legalScreenStyle.legalButton}
          title="Terms of Use"
          onPressButton={TermsofUse}
        />
        <AboutButton
          aboutStyle={legalScreenStyle.legalButton}
          title="Privacy Policy"
          onPressButton={PrivacyPolicy}
        />
        <AboutButton
          aboutStyle={legalScreenStyle.legalButton}
          title="Data Policy"
          onPressButton={onPressDataPolicy}
        />
        <AboutButton
          aboutStyle={legalScreenStyle.legalButton}
          title="EULA Agreement"
          onPressButton={EULAAgreement}
        />
      </View>
    </SafeAreaView>
  );
};
export default LegalScreen;
