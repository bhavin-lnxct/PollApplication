import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Header from '../../components/header/header';
import screenNameEnum from '../../helper/screenNameEnum';
import aboutScreenStyle from './aboutScreenStyle';
import AboutButton from './component/aboutButton/aboutButton';

const AboutDetailScreen = () => {
  const navigation = useNavigation();
  const onPressButtonLegalScreen = () => {
    navigation.navigate(screenNameEnum.LegalScreen);
  };
  const onPressButtonSupport = () => {
    //   navigation.navigate(screenNameEnum.SupportScreen);
  };

  return (
    <SafeAreaView style={aboutScreenStyle.container}>
      <Header title="About" isBack={true} />
      <View style={aboutScreenStyle.viewContainer}>
        <AboutButton
          title="Legal"
          aboutStyle={aboutScreenStyle.aboutButton}
          onPressButton={onPressButtonLegalScreen}
        />
        <AboutButton
          title="Support"
          aboutStyle={aboutScreenStyle.aboutButton}
          onPressButton={onPressButtonSupport}
        />
      </View>
    </SafeAreaView>
  );
};

export default AboutDetailScreen;
