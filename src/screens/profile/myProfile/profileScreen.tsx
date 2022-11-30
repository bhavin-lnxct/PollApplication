import {useNavigation, useRoute} from '@react-navigation/native';
import {taskCancelled} from '@reduxjs/toolkit/dist/listenerMiddleware/exceptions';
import {API, graphqlOperation} from 'aws-amplify';
import {debounce} from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ms} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import SimpleButton from '../../../components/button/SimpleButton';
import FeedCard from '../../../components/card/feedCard';
import Header from '../../../components/header/header';
import Icon from '../../../components/icon/Icon';
import CustomText from '../../../components/text/CustomText';
import ThemeButton from '../../../components/themeButton/themeButton';
import appConstants from '../../../helper/appConstant';
import {showToast} from '../../../helper/helper';
import screenNameEnum from '../../../helper/screenNameEnum';
import {Query} from '../../../network/Query';
import {
  feedSliceActions,
  useMyFeedData,
} from '../../../redux/reducers/feedSlice/feedSlice';
import {useUserData} from '../../../redux/reducers/user-slice/userSlice';
import colors from '../../../theme/colors/colors';
import images from '../../../theme/images/images';
import profileScreenStyle from './profileScreenStyle';

const ProfileScreen = () => {
  const userData = useUserData();
  const dispatch = useDispatch();
  const myData = useMyFeedData();
  const route = useRoute();
  const navigation = useNavigation();
  const [offset, setOffset] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [footerLoading, setFooterLoading] = useState(false);
  const [feedLoading, setFeedLoading] = useState(false);
  const [userProfile, setUserProfile] = useState('');
  const [userName, setUserName] = useState();
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    setOffset(0);
    getUserDetails();
    getMyPostInit();
  }, []);

  const getUserDetails = async () => {
    try {
      setFeedLoading(true);

      if (route?.params?.userId === userData?.user_id) {
        const result = await API.graphql(
          graphqlOperation(Query.getUser, {user_id: userData?.user_id}),
        );
        setUserProfile(
          `https://d1iermgo1iu801.cloudfront.net/${result?.data?.getuser?.image_url}`,
        );

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
        setUserProfile(
          `https://d1iermgo1iu801.cloudfront.net/${result?.data?.getOppositeUser?.image_url}`,
        );
        setIsFollow(result?.data?.getOppositeUser?.follow_already);
        setUserName(result?.data?.getOppositeUser?.user_name);
        setFollowers(result?.data?.getOppositeUser?.follower_count);
        setFollowing(result?.data?.getOppositeUser?.following_count);
        setTotalPosts(result?.data?.getOppositeUser?.post_count);
        setFeedLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      showToast('Something went wrong');
      setFeedLoading(false);
    }
  };

  const onRefreshFlatlist = () => {
    setRefreshing(true);
    setOffset(0);
    getMyPostInit();
  };

  const getMoreMyPosts = async () => {
    if (myData.length <= 1) {
      return;
    }
    setFooterLoading(true);

    try {
      const result = await API.graphql(
        graphqlOperation(Query.getUserPost, {
          user_id: route?.params?.userId,
          my_id: userData?.user_id,
          offset: offset,
        }),
      );

      if (result?.data?.getUserPost === []) {
        setFooterLoading(false);
        return;
      }
      dispatch(
        feedSliceActions.setFeedDataAction({
          collectionName: 'myPosts',
          data: [...myData, ...result?.data?.getUserPost],
        }),
      );
      setFooterLoading(false);
      setOffset(val => val + 10);
    } catch (error) {
      setFooterLoading(false);
      console.log(error.message, 'error in get posts');
    }
  };

  const getMyPostInit = async () => {
    setFeedLoading(true);
    try {
      const result = await API.graphql(
        graphqlOperation(Query.getUserPost, {
          user_id: route?.params?.userId,
          my_id: userData?.user_id,
          offset: 0,
        }),
      );

      dispatch(
        feedSliceActions.setFeedDataAction({
          collectionName: 'myPosts',
          data: result?.data?.getUserPost,
        }),
      );
      setOffset(val => val + 10);
      setRefreshing(false);
      setFeedLoading(false);
      // console.log(result?.data?.getUserPost,'result --------------')
    } catch (error) {
      setRefreshing(false);
      setFeedLoading(false);
      console.log(error.message, 'error from get my post');
      showToast('something went wrong');
    }
  };

  const renderFooterComponent = () => {
    if (footerLoading) {
      return (
        <View style={{width: '100%', marginVertical: 10, marginBottom: ms(80)}}>
          <ActivityIndicator size="large" color={'#003C71'} />
        </View>
      );
    }
    return null;
  };

  const onPressFollow = async () => {
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
        }
      } catch (err) {
        console.log(err.message);
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
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const myProfileHeader = () => {
    return (
      <View>
        <View style={profileScreenStyle.profileHeaderContainer}>
          <FastImage
            source={
              userProfile
                ? {
                    uri: userProfile,
                    priority: FastImage.priority.normal,
                  }
                : images.dp
            }
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
                  heading: 'Followers',
                  userId: route?.params?.userId,
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
                  heading: 'Following',
                  userId: route?.params?.userId,
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
        <View>
          {route.params?.userId === userData?.user_id ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate(screenNameEnum.EditProfileScreen)
              }
              style={[
                profileScreenStyle.profileButton,
                {backgroundColor: '#CECECE'},
              ]}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Icon
                  type={'MaterialCommunityIcons'}
                  name={'account-circle-outline'}
                  color={colors.AppTheme.Primary}
                  size={20}
                />
                <CustomText
                  textStyle={{
                    marginLeft: ms(3),
                    fontSize: ms(15),
                    color: colors.AppTheme.Text,
                  }}>
                  Edit Profile
                </CustomText>
              </View>
            </TouchableOpacity>
          ) : (
            <SimpleButton
              title={isFollow ? 'Following' : 'Follow'}
              onPress={debounce(() => onPressFollow(), 100)}
              containerStyle={[
                profileScreenStyle.profileButton,
                isFollow
                  ? {backgroundColor: '#CECECE'}
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

  return (
    <View style={profileScreenStyle.container}>
      <Header title={userName} isNotification={true} isBack={true} />
      <SafeAreaView>
        {feedLoading ? (
          <View
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color={'#003C71'} />
          </View>
        ) : (
          <FlatList
            data={myData}
            ListHeaderComponent={myProfileHeader}
            renderItem={({item, index}) => (
              <FeedCard
                item={item}
                index={index}
                routeName={appConstants.myPosts}
              />
            )}
            keyExtractor={item => item.post_id}
            ItemSeparatorComponent={() => <View style={{margin: ms(8)}} />}
            showsVerticalScrollIndicator={false}
            disableVirtualization={true}
            keyboardShouldPersistTaps="always"
            scrollEventThrottle={16}
            maxToRenderPerBatch={5}
            windowSize={50}
            onEndReached={() => {
              if (!endReached) {
                getMoreMyPosts();
                setEndReached(true);
              }
            }}
            onEndReachedThreshold={1}
            onMomentumScrollBegin={() => setEndReached(false)}
            scrollEnabled={true}
            style={{marginBottom: ms(50)}}
            contentContainerStyle={{ paddingBottom: 80 }}
            refreshControl={
              <RefreshControl
                colors={['#003C71', 'blue']}
                refreshing={refreshing}
                onRefresh={onRefreshFlatlist}
              />
            }
            ListFooterComponent={renderFooterComponent}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;
