import {View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import FeedCard from '../../../components/card/feedCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/header/header';
import {ms} from 'react-native-size-matters';
import {API, graphqlOperation} from 'aws-amplify';
import {Query} from '../../../network/Query';
import {useUserData} from '../../../redux/reducers/user-slice/userSlice';
import {
  feedSliceActions,
  useFeedData,
} from '../../../redux/reducers/feedSlice/feedSlice';
import {useDispatch} from 'react-redux';
import {Emmiter, showToast} from '../../../helper/helper';
import NetInfo from '@react-native-community/netinfo';
import appConstants from '../../../helper/appConstant';

const FeedScreen = () => {
  const userData = useUserData();
  const feedData = useFeedData();
  const dispatch = useDispatch();
  const FlatListRef = useRef();
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);
  const [footerLoading, setFooterLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);

  useEffect(() => {
    setOffset(0);
    NetInfo.fetch().then(st => {
      if (!st.isConnected) {
        showToast('connect to the internet');
      }
    });
    getInitPosts();
    const emit = Emmiter.addListener('getFeed', () => {
      getInitPosts();
      if (feedData.length <= 1) {
        return;
      }
      FlatListRef.current?.scrollToIndex({
        index: 0,
        animated: true,
      });
    });
    return () => {
      emit.remove();
    };
  }, []);

  const onRefreshFlatlist = () => {
    setRefreshing(true);
    setOffset(0);
    getInitPosts();
  };

  const getInitPosts = async () => {
    try {
      const result = await API.graphql(
        graphqlOperation(Query.getPosts, {
          user_id: userData?.user_id,
          offset: 0,
        }),
      );
      dispatch(
        feedSliceActions.setFeedDataAction({
          collectionName: 'posts',
          data: result?.data?.getAllPost,
        }),
      );
      console.log('result?.data?.getAllPost', result?.data?.getAllPost);
      setRefreshing(false);
      setOffset(val => val + 10);
    } catch (error) {
      console.log(error, 'error in get posts');
      console.log(error.message, 'error in get posts');
    }
  };

  const getMorePosts = async () => {
    if (feedData.length <= 1) {
      return;
    }
    setFooterLoading(true);
    try {
      const result = await API.graphql(
        graphqlOperation(Query.getPosts, {
          user_id: userData?.user_id,
          offset: offset,
        }),
      );

      if (result?.data?.getAllPost === []) {
        setFooterLoading(false);
        return;
      }
      dispatch(
        feedSliceActions.setFeedDataAction({
          collectionName: 'posts',
          data: [...feedData, ...result?.data?.getAllPost],
        }),
      );
      setFooterLoading(false);
      setOffset(val => val + 10);
    } catch (error) {
      setFooterLoading(false);
      console.log(error, 'error in get posts');
      console.log(error.message, 'error in get posts');
    }
  };

  const renderFooterComponent = () => {
    if (footerLoading) {
      return (
        <View
          style={{width: '100%', marginVertical: 10, paddingBottom: ms(80)}}>
          <ActivityIndicator size="large" color={'#003C71'} />
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EFEFEF'}}>
      <Header title="MyThoughts" isUser={true} isNotification={true} />
      <FlatList
        data={feedData}
        ref={FlatListRef}
        // style={{paddingTop: ms(10)}}
        renderItem={({item, index}) => (
          <FeedCard item={item} index={index} routeName={appConstants.posts} />
        )}
        keyExtractor={item => item.post_id}
        ItemSeparatorComponent={() => <View style={{margin: ms(4)}} />}
        showsVerticalScrollIndicator={false}
        disableVirtualization={true}
        keyboardShouldPersistTaps="always"
        scrollEventThrottle={16}
        maxToRenderPerBatch={5}
        windowSize={50}
        onEndReached={() => {
          if (!endReached) {
            getMorePosts();
            setEndReached(true);
          }
        }}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            FlatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        onEndReachedThreshold={1}
        onMomentumScrollBegin={() => setEndReached(false)}
        scrollEnabled={true}
        refreshControl={
          <RefreshControl
            colors={['#003C71', 'blue']}
            refreshing={refreshing}
            onRefresh={onRefreshFlatlist}
          />
        }
        ListFooterComponent={renderFooterComponent}
      />
    </SafeAreaView>
  );
};

export default FeedScreen;
