import {useNavigation} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import moment from 'moment';
import React, {useState} from 'react';
import {Pressable,TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import BottomSheet from '../../../../components/bottomSheet/bottomSheet';
import Repost from '../../../../components/card/repost/Repost';
import Icon from '../../../../components/icon/Icon';
import CustomText from '../../../../components/text/CustomText';
import appConstants from '../../../../helper/appConstant';
import {createShareLink, showToast} from '../../../../helper/helper';
import screenNameEnum from '../../../../helper/screenNameEnum';
import {Query} from '../../../../network/Query';
import {feedSliceActions} from '../../../../redux/reducers/feedSlice/feedSlice';
import {useUserData} from '../../../../redux/reducers/user-slice/userSlice';
import colors from '../../../../theme/colors/colors';
import images from '../../../../theme/images/images';
import feedProfileHeaderStyle from './feedProfileHeaderStyle';
import Popup from '../../../../components/bottomSheet/popup';
import messages from '../../../../helper/messages';
import ReportModal from '../../../../components/reportModal/reportModal';
import Share from 'react-native-share';
export interface ProfileHeaderProps {
  routeName: string;
  item: object;
}

const ProfileHeader = ({routeName, item}: ProfileHeaderProps) => {
  const navigation = useNavigation();
  const userData = useUserData();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpenReportBottomSheet, setIsOpenReportBottomSheet] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const onPressProfile = () => {
    navigation.navigate(screenNameEnum.ProfileScreen, {
      userId: item?.user_id,
      userName: item?.user_name,
    });
  };

  const onPressDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await API.graphql(
        graphqlOperation(Query.deletePost, {post_id: item?.post_id}),
      );
      dispatch(
        feedSliceActions.deletePostAction({
          id: item?.post_id,
        }),
      );
      setIsVisible(false);
      setIsDeleting(false);
    } catch (error) {
      console.log(
        'ERROR in file: feedProfileHeader.tsx:56 ~ onPressDelete',
        error?.errors[0]?.message,
      );
      setIsVisible(false);
      setIsDeleting(false);
      showToast(messages.failedDeletePoll);
    }
  };

  const deletePost = () => {
    setIsVisible(false);
    setDeleteModal(true);
  };

  const onPressReport = () => {
    setIsVisible(false);
    setIsOpenReportBottomSheet(true);
  };

  const onPressShare = async () => {
    setIsVisible(false);
    const link = await createShareLink(item?.post_id);
    let shareOption = {
      title: appConstants.appName,
      url: link,
      message: ` ${item?.post_title}\n`,
    }
    Share.open(shareOption)
    .then(async res => {
      console.log('share response', res);
    })
    .catch(async err => {
      console.log('share response error', err);
    });
  }

  const onPressExplanations = () => {
    setIsVisible(false);
    routeName !== appConstants.feedDetail &&
      navigation.navigate(screenNameEnum.FeedDetailsView, {
        postId: item?.post_id,
      });
  };

  return (
    <View>
      <View style={feedProfileHeaderStyle.container}>
        <Pressable
          disabled={routeName === appConstants.posts || routeName === appConstants.surveys ? false : true}
          onPress={onPressProfile}
          style={feedProfileHeaderStyle.userProfileContainer}>
          <FastImage
            style={feedProfileHeaderStyle.image}
            source={
              item?.user_image
              ? {uri: `https://d1iermgo1iu801.cloudfront.net/${item?.user_image}`}
              : images.dp
            }
          />

          <View style={feedProfileHeaderStyle.textContainer}>
            <CustomText textStyle={feedProfileHeaderStyle.title}>
              {item?.user_name}
            </CustomText>
            <CustomText textStyle={feedProfileHeaderStyle.description}>
              {moment(JSON.parse(item?.post_starttime)).local().startOf('seconds').fromNow() || ''}
            </CustomText>
          </View>
        </Pressable>
        <Pressable onPress={() => setIsVisible(true)}>
          <CustomText>
            <Icon
              type="MaterialCommunityIcons"
              name="dots-vertical"
              size={28}
              color={colors.AppTheme.blackShade50}
            />
          </CustomText>
        </Pressable>
      </View>
      <BottomSheet isVisible={isVisible} onClose={() => setIsVisible(false)}>
        <Repost
          item={item}
          routeName={routeName}
          userId={String(item?.user_id)}
          myId={String(userData?.user_id)}
          deletePost={deletePost}
          onPressDelete={onPressDelete}
          isDeleteLoading={isDeleting}
          onPressReport={onPressReport}
          onPressExplanations={onPressExplanations}
          isExplanation={true}
          onPressShare={onPressShare}
        />
      </BottomSheet>
      <ReportModal 
        isVisible={isOpenReportBottomSheet} 
        setIsVisible={setIsOpenReportBottomSheet} 
        reportTitle={'why are you reporting this post?'}
      />

      {/* Popup Modal */}

      <Popup
        isVisible={isDeleteModal}
        backdropOpacity={0}
        onBackdropPress={() => setDeleteModal(false)}
        onBackButtonPress={() => setDeleteModal(false)}
        onDismiss={() => setDeleteModal(false)}>
        <View style={feedProfileHeaderStyle.popupModal}>
          <CustomText textStyle={feedProfileHeaderStyle.popupModalTitle}>
            Are You Sure You Want To Delete This Post?
          </CustomText>
          <View style={feedProfileHeaderStyle.popupModalButton}>
            <TouchableOpacity
              onPress={onPressDelete}
              activeOpacity={0.8}
              style={feedProfileHeaderStyle.modalButton}>
              <CustomText textStyle={feedProfileHeaderStyle.buttonYes}>
                Yes
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDeleteModal(false)}
              activeOpacity={0.8}
              style={[
                feedProfileHeaderStyle.modalButton,
                feedProfileHeaderStyle.modalButtonSecond,
              ]}>
              <CustomText
                textStyle={[
                  feedProfileHeaderStyle.buttonYes,
                  feedProfileHeaderStyle.buttonNo,
                ]}>
                No
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Popup>
    </View>
  );
};

export default ProfileHeader;
