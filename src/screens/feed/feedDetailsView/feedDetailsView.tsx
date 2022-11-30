import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import Header from '../../../components/header/header';
import {useUserData} from '../../../redux/reducers/user-slice/userSlice';
import FeedCard from '../../../components/card/feedCard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useRoute} from '@react-navigation/native';
import {showToast} from '../../../helper/helper';
import {API, graphqlOperation} from 'aws-amplify';
import {Query} from '../../../network/Query';

const FeedDetailsView = () => {
  const userData = useUserData();
  const route = useRoute();
  const pId = route?.params?.item?.post_id;
  const postId = pId?.split('/')?.slice(-1)[0];
  const [loading, setLoading] = useState(false);
  const [feedData, setFeedData] = useState({});

  useEffect(() => {
    getInitUniquePost();
  }, []);

  const getInitUniquePost = async () => {
    setLoading(true);
    try {
      const result = await API.graphql(
        graphqlOperation(Query.getUniquePost, {
          post_id: postId,
          user_id: userData?.user_id,
        }),
      );
      setFeedData(result?.data?.getUniquePost);
      setLoading(false);
    } catch (error) {
      console.log(error?.errors[0]?.message);
      setLoading(false);
      showToast('Something went wrong');
    }
  };

  return (
    <KeyboardAwareScrollView>
      <Header title="My Thought" isBack={true} />
      {loading && (
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={'#003C71'} />
        </View>
      )}
      {!loading && Object.keys(feedData).length !== 0 && (
        <FeedCard item={feedData} isExplanationVisible />
      )}
    </KeyboardAwareScrollView>
  );
};

export default FeedDetailsView;
