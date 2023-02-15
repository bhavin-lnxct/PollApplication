import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  Button,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ms} from 'react-native-size-matters';
import userProfileStyle from './userProfileStyle';
import {useNavigation} from '@react-navigation/native';
import ThemeButton from '../../../components/themeButton/themeButton';
import colors from '../../../theme/colors/colors';
import Icon from '../../../components/icon/Icon';
import SimpleProfileButton from '../../../components/simpleProfileButton/SimpleProfileButton';
import screenNameEnum from '../../../helper/screenNameEnum';
import {
  userAction,
  useUserData,
} from '../../../redux/reducers/user-slice/userSlice';
import images from '../../../theme/images/images';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {useDispatch} from 'react-redux';
import CustomText from '../../../components/text/CustomText';
import {feedSliceActions} from '../../../redux/reducers/feedSlice/feedSlice';
import svg from '../../../theme/svg/svg';
import SimpleRepostButton from '../../../components/simpleRepostButton/SimpleRepostButton';
import { Query } from '../../../network/Query';

export interface UserProfileInterFace {
  setVisibleProfile: any;
}

const UserProfile = ({setVisibleProfile}: UserProfileInterFace) => {
  const navigation = useNavigation();
  const userData = useUserData();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const ButtonContainer = () => {
    const goToChangePassword = () => {
      setTimeout(() => {
        navigation.navigate(screenNameEnum.ChangePassword);
      }, 400);
      setVisibleProfile(false);
    };
    const goToSetting = () => {
      console.log('go to notification');
      // setTimeout(() => {
      //   navigation.navigate(screenNameEnum.FeedDetailsView);
      // }, 400);
    };
    const inviteFriend = () => {
      console.log('Invite frieds clicked');
    };
    const goToAboutScreen = () => {
      navigation.navigate(screenNameEnum.AboutStack);
      setVisibleProfile(false);
    };
    return (
      <>
        <SimpleProfileButton
          title="Change Password"
          icon={svg.ChangePass}
          onPressButton={goToChangePassword}
        />
        <SimpleProfileButton
          title="About"
          icon={svg.About}
          onPressButton={goToAboutScreen}
        />
      </>
    );
  };

  const UserProfileHeader = () => {
    return (
      <View style={userProfileStyle.headerContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FastImage
            style={userProfileStyle.profileImage}
            source={
              userData?.image_url
                ? {
                    uri: `https://d1iermgo1iu801.cloudfront.net/${userData?.image_url}`,
                    priority: FastImage.priority.high,
                  }
                : images.dp
            }
            resizeMode={FastImage.resizeMode.cover}
          />

          <CustomText textStyle={userProfileStyle.userDisplayName}>
            {userData?.user_name}
          </CustomText>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
          onPress={onPressViewPage}>
          <CustomText textStyle={userProfileStyle.userViewProfile}>
            View Profile
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  const LogoutContainer = () => {
    return (
      <View style={userProfileStyle.logoutContanier}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={userProfileStyle.logoutButton}
          onPress={() => {
            setLoading(true);
            setTimeout(async () => {
              await Auth.signOut();
              try {
                await API.graphql(graphqlOperation(Query.deleteToken,{user_id: userData?.user_id}));
              } catch (error) {
                console.log('failded to delete token')
              }
              dispatch(userAction.clearUser());
              dispatch(feedSliceActions.clearFeedData());
              setLoading(false);
            }, 1000);
          }}>
          <View style={userProfileStyle.logoutIconView}>
            <Icon
              size={24}
              name="logout"
              color={'#79AFC1'}
              type={'MaterialIcons'}
            />
          </View>
          <Text style={userProfileStyle.logoutButtonTitle}>
            {loading ? (
              <ActivityIndicator size="small" color={'black'} />
            ) : (
              'Logout'
            )}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onPressViewPage = () => {
    setVisibleProfile(false);
    navigation.navigate(screenNameEnum.ProfileScreen, {
      userId: userData?.user_id,
    });
  };

  return (
    <View style={userProfileStyle.container}>
      <UserProfileHeader />
      <ButtonContainer />
      <LogoutContainer />
    </View>
  );
};
export default UserProfile;
