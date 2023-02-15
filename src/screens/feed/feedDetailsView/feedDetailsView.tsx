import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import Header from '../../../components/header/header';
import {useUserData} from '../../../redux/reducers/user-slice/userSlice';
import FeedCard from '../../../components/card/feedCard';
import {useRoute} from '@react-navigation/native';
import {showToast} from '../../../helper/helper';
import {API, graphqlOperation} from 'aws-amplify';
import {Query} from '../../../network/Query';
import {useDispatch} from 'react-redux';
import {
  feedSliceActions,
  useFeedDetailData,
} from '../../../redux/reducers/feedSlice/feedSlice';
import appConstants from '../../../helper/appConstant';
import PostNotFound from '../../../components/postNotFound/PostNotFound';
import colors from '../../../theme/colors/colors';
import Loading from '../../../components/loading/Loading';
import CustomText from '../../../components/text/CustomText';
import feedCardStyle from '../../../components/card/feedCardStyle';
import FastImage from 'react-native-fast-image';
import images from '../../../theme/images/images';
import {ms} from 'react-native-size-matters';
import feedDetailsViewStyle from './feedDetailsViewStyle';
import messages from '../../../helper/messages';

const FeedDetailsView = () => {
  const userData = useUserData();
  const route = useRoute();
  const dispatch = useDispatch();
  const feedDetailData = useFeedDetailData();
  const postId = route?.params?.postId;
  const [loading, setLoading] = useState(false);
  const [explanations, setExplanations] = useState([]);

  useEffect(() => {
    getInitUniquePost();
  }, [route]);

  const getExplanations = async () => {
    try {
      const result = await API.graphql(
        graphqlOperation(Query.getPostExplanation, {post_id: postId}),
      );
      setExplanations(result?.data?.getPostExplanation);
    } catch (error) {
      console.log(
        'ERROR in file: feedCard.tsx:54 ~ getExplanations',
        error?.errors[0]?.message,
      );
    }
  };

  const getInitUniquePost = async () => {
    setLoading(true);
    try {
      const result = await API.graphql(
        graphqlOperation(Query.getUniquePost, {
          post_id: postId,
          user_id: userData?.user_id,
        }),
      );
      if (result?.data?.getUniquePost?.post_required_explanation) {
        getExplanations();
      }
      if (result?.data?.getUniquePost?.post_id !== null) {
        dispatch(
          feedSliceActions.setFeedDataAction({
            collectionName: 'feedDetail',
            data: result?.data?.getUniquePost,
          }),
        );
      } else {
        dispatch(
          feedSliceActions.setFeedDataAction({
            collectionName: 'feedDetail',
            data: null,
          }),
        );
      }
      setLoading(false);
    } catch (error) {
      console.log(
        'ERROR in file: feedDetailsView.tsx:59 ~ getInitUniquePost',
        error?.errors[0]?.message,
      );
      setLoading(false);
      showToast(messages.somethingWentWrong);
    }
  };

  const ExplanationRow = ({
    explanationText,
    user_id,
    user_image,
    user_name,
  }) => {
    return (
      <View style={feedDetailsViewStyle.explanationsContainer}>
        <FastImage
          source={
            user_image
              ? {
                  uri: `https://d1iermgo1iu801.cloudfront.net/${user_image}`,
                  priority: FastImage.priority.normal,
                }
              : images.dp
          }
          resizeMode={FastImage.resizeMode.cover}
          style={feedDetailsViewStyle.userImage}
        />
        <View>
          <CustomText textStyle={feedDetailsViewStyle.userName}>
            {user_name}
          </CustomText>
          <CustomText
            textStyle={[
              feedDetailsViewStyle.userName,
              {
                fontWeight: 'bold',
              },
            ]}>
            {explanationText}
          </CustomText>
        </View>
      </View>
    );
  };

  return (
    <View style={feedDetailsViewStyle.container}>
      <Header title={'Post'} isBack={true} />
      {loading ? (
        <Loading Size={'large'} Color={colors.AppTheme.Primary} />
      ) : feedDetailData !== null ? (
        <View style={{paddingBottom:ms(45)}}>
          <FeedCard
            item={feedDetailData}
            routeName={appConstants.feedDetail}
            index={0}
          />
          {userData?.user_id === feedDetailData?.user_id &&
            feedDetailData?.post_required_explanation && (
              <>
                <CustomText
                  textStyle={feedDetailsViewStyle.explanationHeaderText}>
                  Explanations :
                </CustomText>
                {(explanations.length > 0 && explanations) ? (
                  <View style={feedDetailsViewStyle.explanationListContainer}>
                    <FlatList
                      data={explanations}
                      keyExtractor={(item, index) => `${index}`}
                      renderItem={({item, index}) => {
                        return (
                          <ExplanationRow
                            key={index}
                            explanationText={item?.explanation}
                            user_id={item?.user_id}
                            user_image={item?.user_image}
                            user_name={item?.user_name}
                          />
                        );
                      }}
                    />
                  </View>
                ) : (
                  <CustomText
                    textStyle={{
                      color: colors.AppTheme.Text,
                      marginLeft: ms(16),
                    }}>
                    No explanations here
                  </CustomText>
                )}
              </>
            )}
        </View>
      ) : (
        <PostNotFound />
      )}
    </View>
  );
};

export default FeedDetailsView;
