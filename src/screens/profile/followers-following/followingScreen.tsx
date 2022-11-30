import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import {debounce} from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList, TextInput, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Searchbar} from 'react-native-paper';
import {ms} from 'react-native-size-matters';
import SimpleButton from '../../../components/button/SimpleButton';
import Header from '../../../components/header/header';
import Icon from '../../../components/icon/Icon';
import CustomText from '../../../components/text/CustomText';
import {Query} from '../../../network/Query';
import {useUserData} from '../../../redux/reducers/user-slice/userSlice';
import colors from '../../../theme/colors/colors';
import followersFollowingStyle from './followersFollowingStyle';

interface FollowingScreenInterface {
  setHeaderText: (text: string) => void;
  user_id: string;
  user_image: string;
  username: string;
}

const FollowingScreen = ({setHeaderText}: FollowingScreenInterface) => {
  const route = useRoute();
  const userData = useUserData();
  const [isFollow, setIsFollow] = useState(false);
  const [followingData, setFollowingData] = useState([]);
  const navigation = useNavigation();

  const getFollowing = async () => {
    try {
      const result = await API.graphql(
        graphqlOperation(Query.getFollowing, {user_id: route?.params?.userId}),
      );
      setFollowingData(result?.data?.getFollowing);
    } catch (err) {
      console.log('Error from getFollowing', err?.data?.errors[0]?.message);
    }
  };

  useCallback(() => {
    getFollowing();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setHeaderText('Following');
    }, []),
  );

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
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const UserRow = ({
    user_id,
    user_image,
    username,
  }: FollowingScreenInterface) => {
    return (
      <View style={followersFollowingStyle.userRowContainer}>
        <View style={followersFollowingStyle.userDataContainer}>
          <Pressable
            onPress={() =>
              navigation.navigate(screenNameEnum.ProfileScreen, {
                user_id,
                username,
              })
            }>
            <FastImage
              source={{
                uri: `https://d1iermgo1iu801.cloudfront.net/${user_image}`,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
              style={followersFollowingStyle.userImage}
            />
          </Pressable>
          <CustomText
            textStyle={{
              marginLeft: ms(5),
              color: colors.AppTheme.Text,
            }}>
            {username}
          </CustomText>
        </View>
        <View
          style={{
            width: ms(80),
          }}>
          {userData.user_id === user_id ? (
            <CustomText
              textStyle={{
                textDecorationLine: 'underline',
                color: colors.AppTheme.Text,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: ms(16),
              }}>
              You
            </CustomText>
          ) : (
            <SimpleButton
              title={isFollow ? 'Following' : 'Follow'}
              onPress={debounce(() => onPressFollow(), 100)}
              containerStyle={[
                followersFollowingStyle.followButtonContainer,
                isFollow
                  ? {backgroundColor: '#CECECE'}
                  : {backgroundColor: colors.AppTheme.Primary},
              ]}
              buttonTitleStyle={[
                {fontSize: ms(14)},
                isFollow
                  ? {color: colors.AppTheme.Text}
                  : {color: colors.AppTheme.Secondary},
              ]}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={followersFollowingStyle.container}>
      <View style={followersFollowingStyle.searchBar}>
        <View style={followersFollowingStyle.searchBarIcon}>
          <Icon type="Feather" name="search" color="#7D7D7D" size={ms(20)} />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <TextInput
            placeholder="Search"
            cursorColor={colors.AppTheme.Text}
            placeholderTextColor={'#7D7D7D'}
            style={followersFollowingStyle.searchBarTextInput}
          />
        </View>
      </View>
      <Text style={followersFollowingStyle.allFollowersText}>
        All Followers
      </Text>
      {followingData.length === 0 ? (
        <View style={followersFollowingStyle.noFollowersText}>
          <CustomText
            textStyle={{
              color: colors.AppTheme.Text,
            }}>
            No followers yet.
          </CustomText>
        </View>
      ) : (
        <FlatList
          data={followingData}
          renderItem={({item, index}) => (
            <UserRow
              user_image={item?.user_image}
              username={item?.username}
              user_id={item?.user_id}
            />
          )}
        />
      )}
    </View>
  );
};

export default FollowingScreen;
