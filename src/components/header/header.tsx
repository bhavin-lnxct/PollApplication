import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ms} from 'react-native-size-matters';
import screenNameEnum from '../../helper/screenNameEnum';
import {useUserData} from '../../redux/reducers/user-slice/userSlice';
import UserProfile from '../../screens/profile/components/userProfile';
import images from '../../theme/images/images';
import BottomSheet from '../bottomSheet/bottomSheet';
import Icon from '../icon/Icon';
import CustomText from '../text/CustomText';
import {styles} from './headerStyle';

export interface HeaderProps {
  title?: string;
  isBack?: boolean;
  post?: boolean;
  isClose?: boolean;
  isProfile?: boolean;
  onpress?: () => void;
  onPressPost?: () => void;
  onPressProfile?: () => void;
  isUser?: boolean;
  isNotification?: boolean;
}

const Header = ({
  title,
  isBack = false,
  post = false,
  isClose = false,
  isUser = false,
  isProfile = false,
  isNotification = false,
  onpress,
  onPressPost,
  onPressProfile,
}: HeaderProps) => {
  const [isVisibleProfile, setVisibleProfile] = useState(false);
  const userData = useUserData();
  const navigation = useNavigation();
  const UserProfiles = useRef();

  const onPressNotification = () => {
    navigation.navigate(screenNameEnum.Notification);
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          {isBack && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}>
              <Icon
                type="Feather"
                size={24}
                name={'chevron-left'}
                color={'#EBEBEB'}
              />
            </TouchableOpacity>
          )}
          {isClose && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}>
              <Icon type="AntDesign" name="close" size={24} color={'#EBEBEB'} />
            </TouchableOpacity>
          )}
          {isUser && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setVisibleProfile(!isVisibleProfile);
              }}>
              <FastImage
                source={
                  userData?.image_url
                    ? {
                        uri: `https://d1iermgo1iu801.cloudfront.net/${userData?.image_url}`,
                        priority: FastImage.priority.normal,
                      }
                    : images.dp
                }
                resizeMode={FastImage.resizeMode.cover}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          )}

          {!isBack && !isUser && !isClose && <View style={{width: ms(24)}} />}
          <CustomText textStyle={styles.headerTitleStyle}>{title}</CustomText>
          {isNotification && <View style={{width: ms(30)}} />}
          {post && (
            <TouchableOpacity activeOpacity={0.8} onPress={onPressPost}>
              <CustomText textStyle={styles.postTextStyle}>Post</CustomText>
            </TouchableOpacity>
          )}
          {isProfile && (
            <TouchableOpacity activeOpacity={0.8} onPress={onPressProfile}>
              <Icon
                type="MaterialCommunityIcons"
                name="account-check"
                size={24}
                color={'#EBEBEB'}
              />
            </TouchableOpacity>
          )}
          {!isNotification && !post && !isProfile && (
            <View style={{width: ms(24)}} />
          )}
        </View>
      </View>
      <BottomSheet
        isVisible={isVisibleProfile}
        onClose={() => setVisibleProfile(false)}
        refer={UserProfiles}>
        <UserProfile setVisibleProfile={setVisibleProfile} />
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Header;
