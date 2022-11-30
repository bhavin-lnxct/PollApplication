import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {styles} from './headerStyle';
import {useNavigation} from '@react-navigation/native';
import Icon from '../icon/Icon';
import {Paragraph} from 'react-native-paper';
import CustomText from '../text/CustomText';
import BottomSheet from '../bottomSheet/bottomSheet';
import SimpleButton from '../button/SimpleButton';
import UserProfile from '../../screens/profile/components/userProfile';
import {useUserData} from '../../redux/reducers/user-slice/userSlice';
import FastImage from 'react-native-fast-image';
import images from '../../theme/images/images';
import {ms} from 'react-native-size-matters';
import screenNameEnum from '../../helper/screenNameEnum';

export interface HeaderProps {
  title?: string;
  isBack?: boolean;
  post?: boolean;
  isClose?: boolean;
  isProfile?: boolean;
  onpress: () => void;
  onPressPost: () => void;
  onPressProfile: () => void;
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
      <View style={styles.headerContainer}>
        <View style={styles.container}>
          {isBack && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}>
              <IconAntDesign size={24} name={'arrowleft'} color={'#EBEBEB'} />
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
          {isNotification && (
            <TouchableOpacity activeOpacity={0.8} onPress={onPressNotification}>
              <IconIonicons
                size={24}
                name={'ios-notifications-outline'}
                color={'#EBEBEB'}
              />
            </TouchableOpacity>
          )}
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
