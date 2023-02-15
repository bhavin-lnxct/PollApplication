import {
  useFocusEffect,
  useIsFocused,
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
import {Emmiter} from '../../../helper/helper';
import screenNameEnum from '../../../helper/screenNameEnum';
import {Query} from '../../../network/Query';
import {useUserData} from '../../../redux/reducers/user-slice/userSlice';
import colors from '../../../theme/colors/colors';
import images from '../../../theme/images/images';
import followersFollowingStyle from './followersFollowingStyle';

interface FollowersScreenInterface {
  item: [object];
  userId: string;
}

const FollowersScreen = ({userId}: FollowersScreenInterface) => {
  const route = useRoute();
  const userData = useUserData();
  const navigation = useNavigation();
  const [followersData, setFollowersData] = useState([]);
  const [tempFollowerData, setTempFollowerData] = useState([]);

  const getFollowers = async () => {
    try {
      const result = await API.graphql(
        graphqlOperation(Query.getFollowers, {
          my_id: userData?.user_id,
          user_id: userId,
        }),
      );
      setFollowersData(result?.data?.getFollowers);
      setTempFollowerData(result?.data?.getFollowers);
    } catch (error) {
      console.log(
        'ERROR in file: followersScreen.tsx:48 ~ getFollowers',
        error?.errors[0]?.message,
      );
    }
  };

  useEffect(() => {
    getFollowers();
  }, []);

  const searchUser = (text:string) => {
    if(text === ''){
      setFollowersData(tempFollowerData);
    }else{
      const user = tempFollowerData.filter((dt)=>dt.username.includes(text));
      setFollowersData(user);
    }
  }

  const UserRow = ({item}: FollowersScreenInterface) => {
    const [loading, setLoading] = useState(false);
    const [isFollow, setIsFollow] = useState(item?.already_follow);

    const onPressFollow = async () => {
      if (loading) {
        return;
      }
      if (isFollow) {
        setIsFollow(false);
        setLoading(true);
        try {
          const result = await API.graphql(
            graphqlOperation(Query.unFollowUser, {
              following_id: item?.user_id,
              user_id: userData?.user_id,
            }),
          );
          Emmiter.emit('decreaseFollowing');
          setLoading(false);
        } catch (error) {
          console.log(
            'ERROR in file: followersScreen.tsx:76 ~ onPressFollow',
            error?.errors[0]?.message,
          );
          setLoading(false);
        }
      } else {
        setIsFollow(true);
        setLoading(true);
        try {
          const result = await API.graphql(
            graphqlOperation(Query.followUser, {
              follow_time: new Date().toString(),
              following_id: item?.user_id,
              user_id: userData?.user_id,
            }),
          );
          Emmiter.emit('increaseFollowing');
          setLoading(false);
        } catch (error) {
          console.log(
            'ERROR in file: followersScreen.tsx:92 ~ onPressFollow',
            error?.errors[0]?.message,
          );
          setLoading(false);
        }
      }
    };

    return (
      <View style={followersFollowingStyle.userRowContainer}>
        <View style={followersFollowingStyle.userDataContainer}>
          <Pressable
            onPress={() =>
              navigation.navigate(screenNameEnum.ProfileScreen, {
                userId: item?.user_id
              })
            }>
            <FastImage
              source={item?.user_image ? {
                uri: `https://d1iermgo1iu801.cloudfront.net/${item?.user_image}`,
                priority: FastImage.priority.normal,
              } : images.dp}
              resizeMode={FastImage.resizeMode.cover}
              style={followersFollowingStyle.userImage}
            />
          </Pressable>
          <CustomText
            textStyle={{
              marginLeft: ms(5),
              color: colors.AppTheme.Text,
            }}>
            {item?.username}
          </CustomText>
        </View>
        <View
          style={{
            width: ms(80),
          }}>
          {userData.user_id === item?.user_id ? (
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
              loading={loading}
              loadingColor={
                isFollow ? colors.AppTheme.Primary : colors.AppTheme.Secondary
              }
              title={isFollow ? 'Following' : 'Follow'}
              onPress={debounce(() => onPressFollow(), 100)}
              containerStyle={[
                followersFollowingStyle.followButtonContainer,
                isFollow
                  ? {backgroundColor: colors.AppTheme.OtherSecond}
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
            onChangeText={(val) => searchUser(val)}
          />
        </View>
      </View>
      {followersData.length === 0 ? (
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
          data={followersData}
          renderItem={({item, index}) => <UserRow item={item} />}
          keyExtractor={item => item?.user_id}
        />
      )}
    </View>
  );
};

export default FollowersScreen;
