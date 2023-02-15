import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import colors from '../../theme/colors/colors';
export interface LoadingInterface {
Size: any;
Color: any;
}
const Loading = ({Size,Color}:LoadingInterface) => {
  return (
    <View style={{height:'100%', justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={Size} color={Color} />
    </View>
  );
};

export default Loading;
