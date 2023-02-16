import {useNavigation, useRoute} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import {debounce} from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  useWindowDimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ms} from 'react-native-size-matters';
import SimpleButton from '../../../components/button/SimpleButton';
import Header from '../../../components/header/header';
import Icon from '../../../components/icon/Icon';
import CustomText from '../../../components/text/CustomText';
import {Emmiter, showToast} from '../../../helper/helper';
import messages from '../../../helper/messages';
import screenNameEnum from '../../../helper/screenNameEnum';
import {Query} from '../../../network/Query';
import {useUserData} from '../../../redux/reducers/user-slice/userSlice';
import colors from '../../../theme/colors/colors';
import images from '../../../theme/images/images';
import profileScreenStyle from './profileScreenStyle';
import ViewMoreText from 'react-native-view-more-text';
import {TabBar, TabView} from 'react-native-tab-view';
import ProfilePollScreen from './component/pollScreen';
import ProfileSurveyScreen from './component/surveyScreen';

const ProfileScreen = () => {
  const userData = useUserData();
  const layout = useWindowDimensions();
  const route = useRoute();
  const userId = route?.params?.userId;
  const navigation = useNavigation();
  const [feedLoading, setFeedLoading] = useState(false);
  const [userProfile, setUserProfile] = useState('');
  const [userName, setUserName] = useState();
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isFollow, setIsFollow] = useState(false);
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'poll', title: 'poll'},
    {key: 'survey', title: 'survey'},
  ]);
  useEffect(() => {
    getUserDetails();
  }, [route]);

  const getUserDetails = async () => {
    try {
      setFeedLoading(true);
      if (route?.params?.userId === userData?.user_id) {
        const result = await API.graphql(
          graphqlOperation(Query.getUser, {user_id: userData?.user_id}),
        );
        if (!result?.data?.getuser?.image_url) {
          setUserProfile(result?.data?.getuser?.image_url);
        } else {
          setUserProfile(
            `https://d1iermgo1iu801.cloudfront.net/${result?.data?.getuser?.image_url}`,
          );
        }
        setItem(result?.data?.getuser);
        setUserName(result?.data?.getuser?.user_name);
        setFollowers(result?.data?.getuser?.follower_count);
        setFollowing(result?.data?.getuser?.following_count);
        setTotalPosts(result?.data?.getuser?.post_count);
        setFeedLoading(false);
      } else {
        const result = await API.graphql(
          graphqlOperation(Query.getOppositeUser, {
            my_id: userData?.user_id,
            user_id: route?.params?.userId,
          }),
        );
        if (!result?.data?.getOppositeUser?.image_url) {
          setUserProfile(result?.data?.getOppositeUser?.image_url);
        } else {
          setUserProfile(
            `https://d1iermgo1iu801.cloudfront.net/${result?.data?.getOppositeUser?.image_url}`,
          );
        }
        setItem(result?.data?.getOppositeUser);
        setIsFollow(result?.data?.getOppositeUser?.follow_already);
        setUserName(result?.data?.getOppositeUser?.user_name);
        setFollowers(result?.data?.getOppositeUser?.follower_count);
        setFollowing(result?.data?.getOppositeUser?.following_count);
        setTotalPosts(result?.data?.getOppositeUser?.post_count);
        setFeedLoading(false);
      }
    } catch (error) {
      console.log(error?.errors[0]?.message);
      showToast(messages.somethingWentWrong);
      setFeedLoading(false);
    }
  };

  const onPressFollow = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (isFollow) {
      setIsFollow(false);
      try {
        const result = await API.graphql(
          graphqlOperation(Query.unFollowUser, {
            following_id: route?.params?.userId,
            user_id: userData?.user_id,
          }),
        );
        if (result) {
          setFollowers(val => val - 1);
          setLoading(false);
        }
      } catch (error) {
        console.log(error?.errors[0]?.message);
        setLoading(false);
      }
    } else {
      setIsFollow(true);
      try {
        const result = await API.graphql(
          graphqlOperation(Query.followUser, {
            follow_time: new Date().toString(),
            following_id: route?.params?.userId,
            user_id: userData?.user_id,
          }),
        );
        if (result) {
          setFollowers(val => val + 1);
          setLoading(false);
        }
      } catch (error) {
        console.log(error?.errors[0]?.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    Emmiter.addListener('increaseFollowing', () => {
      if (route?.params?.userId === userData?.user_id) {
        return setFollowing(val => val + 1);
      }
    });
    Emmiter.addListener('decreaseFollowing', () => {
      if (route?.params?.userId === userData?.user_id) {
        return setFollowing(val => val - 1);
      }
    });
  }, []);

  const renderViewMore = onPress => {
    return (
      <Text style={profileScreenStyle.moreLessText} onPress={onPress}>
        More
      </Text>
    );
  };

  const renderViewLess = onPress => {
    return (
      <Text style={profileScreenStyle.moreLessText} onPress={onPress}>
        Less
      </Text>
    );
  };

  const myProfileHeader = () => {
    return (
      <View>
        <View style={profileScreenStyle.profileHeaderContainer}>
          <FastImage
            source={userProfile ? {uri: userProfile} : images.dp}
            resizeMode={FastImage.resizeMode.cover}
            style={profileScreenStyle.imageStyle}
          />
          <View style={profileScreenStyle.textMainContainer}>
            <View style={profileScreenStyle.textContainer}>
              <Text style={profileScreenStyle.headerContainerText}>
                {totalPosts}
              </Text>
              <Text style={profileScreenStyle.headerFollowerText}>Posts</Text>
            </View>
            <TouchableNativeFeedback
              onPress={() =>
                navigation.navigate(screenNameEnum.TopTabNavigation, {
                  userId:
                    route?.params?.userId === userData?.user_id
                      ? userData.user_id
                      : route?.params?.userId,
                  item: item,
                  index: 0,
                })
              }
              background={TouchableNativeFeedback.Ripple('#CECECE', true, 46)}>
              <View style={profileScreenStyle.textContainer}>
                <Text style={profileScreenStyle.headerContainerText}>
                  {followers}
                </Text>
                <Text style={profileScreenStyle.headerFollowerText}>
                  Followers
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() =>
                navigation.navigate(screenNameEnum.TopTabNavigation, {
                  userId:
                    route?.params?.userId === userData?.user_id
                      ? userData.user_id
                      : route?.params?.userId,
                  item: item,
                  index: 1,
                })
              }
              background={TouchableNativeFeedback.Ripple('#CECECE', true, 46)}>
              <View style={profileScreenStyle.textContainer}>
                <Text style={profileScreenStyle.headerContainerText}>
                  {following}
                </Text>
                <Text style={profileScreenStyle.headerFollowerText}>
                  Following
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        {item?.user_display_name && (
          <CustomText textStyle={profileScreenStyle.userName}>
            {item?.user_display_name}
          </CustomText>
        )}
        {item?.user_bio && (
          <ViewMoreText
            textStyle={profileScreenStyle.bioText}
            numberOfLines={2}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}>
            {item?.user_bio}
          </ViewMoreText>
        )}

        <View>
          {route.params?.userId === userData?.user_id ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate(screenNameEnum.EditProfileScreen)
              }
              style={[
                profileScreenStyle.profileButton,
                {backgroundColor: colors.AppTheme.OtherSecond},
              ]}>
              <View style={profileScreenStyle.editProfileButtonView}>
                <Icon
                  type={'MaterialCommunityIcons'}
                  name={'account-circle-outline'}
                  color={colors.AppTheme.Primary}
                  size={20}
                />
                <CustomText textStyle={profileScreenStyle.editProfileText}>
                  Edit Profile
                </CustomText>
              </View>
            </TouchableOpacity>
          ) : (
            <SimpleButton
              loading={loading}
              loadingColor={
                isFollow ? colors.AppTheme.Primary : colors.AppTheme.Secondary
              }
              title={isFollow ? 'Following' : 'Follow'}
              onPress={debounce(() => onPressFollow(), 100)}
              containerStyle={[
                profileScreenStyle.profileButton,
                isFollow
                  ? {backgroundColor: colors.AppTheme.OtherSecond}
                  : {backgroundColor: colors.AppTheme.Primary},
              ]}
              buttonTitleStyle={
                isFollow
                  ? {color: colors.AppTheme.Text}
                  : {color: colors.AppTheme.Secondary}
              }
            />
          )}
        </View>
      </View>
    );
  };

  const renderScene = ({route, jumpTo}: {route: any; jumpTo: any}) => {
    switch (route?.key) {
      case 'poll':
        return <ProfilePollScreen userId={userId} />;
      case 'survey':
        return <ProfileSurveyScreen userId={userId} />;
    }
  };

  const renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        pressColor={'transparent'}
        style={profileScreenStyle.tabBar}
        indicatorStyle={{backgroundColor: colors.AppTheme.Primary}}
        renderLabel={({route}) => {
          const isPoll = route?.key === 'poll';
          return (
            <CustomText textStyle={profileScreenStyle.tabBarText}>
              {isPoll ? 'Poll' : 'Survey'}
            </CustomText>
          );
        }}
      />
    );
  };

  return (
    <View style={profileScreenStyle.container}>
      <Header title={userName} isNotification={true} isBack={true} />
      {myProfileHeader()}
      <ProfilePollScreen userId={userId} />
    </View>
  );
};

export default ProfileScreen;
