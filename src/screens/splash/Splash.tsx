import {View} from 'react-native';
import React from 'react';
import SplashStyle from './SplashStyle';
import {SvgXml} from 'react-native-svg';
import svg from '../../theme/svg/svg';

const SplashScreen = () => {
  return (
    <View style={SplashStyle.container}>
      <View style={SplashStyle.SplashImage}>
        <SvgXml xml={svg.Splash} />
      </View>
    </View>
  );
};

export default SplashScreen;
