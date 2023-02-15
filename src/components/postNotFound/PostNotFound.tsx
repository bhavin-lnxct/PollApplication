import {View, Text} from 'react-native';
import React from 'react';
import CustomText from '../text/CustomText';
import colors from '../../theme/colors/colors';
import {ms} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';
import svg from '../../theme/svg/svg';
import { useNavigation } from '@react-navigation/native';
import screenNameEnum from '../../helper/screenNameEnum';

const PostNotFound = () => {

  const navigation = useNavigation();
  const createPoll = () => {
    navigation.navigate(screenNameEnum.CreateFeedScreen)
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        
      <CustomText
        textStyle={{
          fontSize: ms(24),
          color: colors.AppTheme.Primary,
          fontWeight: '700',
          textDecorationLine: 'underline',
        }}
        onPress={createPoll}
        >
        Create New Poll
      </CustomText>

      <SvgXml xml={svg.CreateNewPoll}  style={{marginTop: ms(40)}}/>
    </View>
  );
};

export default PostNotFound;
