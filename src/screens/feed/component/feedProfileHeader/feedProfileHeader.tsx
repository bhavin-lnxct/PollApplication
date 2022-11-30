import {useNavigation} from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import React, { useState } from 'react';
import {Image, Pressable, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {ms} from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import BottomSheet from '../../../../components/bottomSheet/bottomSheet';
import Repost from '../../../../components/card/repost/Repost';
import Icon from '../../../../components/icon/Icon';
import CustomText from '../../../../components/text/CustomText';
import appConstants from '../../../../helper/appConstant';
import { showToast } from '../../../../helper/helper';
import screenNameEnum from '../../../../helper/screenNameEnum';
import { Query } from '../../../../network/Query';
import { feedSliceActions } from '../../../../redux/reducers/feedSlice/feedSlice';
import { useUserData } from '../../../../redux/reducers/user-slice/userSlice';
import colors from '../../../../theme/colors/colors';
import images from '../../../../theme/images/images';
import feedProfileHeaderStyle from './feedProfileHeaderStyle';

export interface ProfileHeaderProps {
  routeName?: string;
  item?: object;
}

const ProfileHeader = ({
  routeName,
  item
}: ProfileHeaderProps) => {

  const navigation = useNavigation();
  const userData = useUserData();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onPressProfile = () => {
    navigation.navigate(screenNameEnum.ProfileScreen, {userId: item?.user_id, userName: item?.user_name});
  };

  const onPressDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await API.graphql(graphqlOperation(Query.deletePost, {post_id: item?.post_id}));
      console.log(result,'result in delete post');
      dispatch(feedSliceActions.deletePostAction({
        routeName: routeName,
        id: item?.post_id
      }));
      setIsVisible(false);
      setIsDeleting(false);
    } catch (error) {error
      console.log(error.message,'error in delete post');
      setIsDeleting(false);
      showToast('failed to delete post')
    }
  }

  return (
    <>
      <View style={feedProfileHeaderStyle.container}>
        <Pressable
          disabled={routeName === appConstants.posts ? false : true}
          onPress={onPressProfile}
          style={feedProfileHeaderStyle.userProfileContainer}>
          <View>
            <Image
              style={feedProfileHeaderStyle.image}
              source={item?.user_image ? {uri: `https://d1iermgo1iu801.cloudfront.net/${item?.user_image}`} : images.dp}
            />
          </View>
          <View style={feedProfileHeaderStyle.textContainer}>
            <CustomText textStyle={feedProfileHeaderStyle.title}>
              {item?.user_name}
            </CustomText>
            <CustomText textStyle={feedProfileHeaderStyle.description}>
              {moment(JSON?.parse(item?.post_starttime))
                .local()
                .startOf('seconds')
                .fromNow() || ''}
            </CustomText>
          </View>
        </Pressable>
        <Pressable onPress={() => setIsVisible(true)}>
          <CustomText>
            <Icon
              type="MaterialCommunityIcons"
              name="dots-vertical"
              size={28}
              color={colors.blackShade50}
            />
          </CustomText>
        </Pressable>
      </View>
      <BottomSheet isVisible={isVisible} onClose={() => setIsVisible(false)}>
        <Repost 
          userId={String(item?.user_id)} 
          myId={String(userData?.user_id)} 
          onPressDelete={onPressDelete}
          isDeleteLoading={isDeleting}
        />
      </BottomSheet>
    </>
  );
};

export default ProfileHeader;
