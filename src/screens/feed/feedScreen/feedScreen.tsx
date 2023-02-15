import {View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import FeedCard from '../../../components/card/feedCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/header/header';
import {ms} from 'react-native-size-matters';
import {API, graphqlOperation} from 'aws-amplify';
import {Query} from '../../../network/Query';
import {
  useFeedSelector,
  useUserData,
} from '../../../redux/reducers/user-slice/userSlice';
import {
  feedSliceActions,
  useFeedData,
} from '../../../redux/reducers/feedSlice/feedSlice';
import {useDispatch} from 'react-redux';
import {Emmiter, showToast} from '../../../helper/helper';
import NetInfo from '@react-native-community/netinfo';
import appConstants from '../../../helper/appConstant';
import PostNotFound from '../../../components/postNotFound/PostNotFound';
import colors from '../../../theme/colors/colors';
import Loading from '../../../components/loading/Loading';
import feedScreenStyle from './feedScreenStyle';
import messages from '../../../helper/messages';

const FeedScreen = () => {
  // const layout = useWindowDimensions();
  // const [index, setIndex] = React.useState(0);
  // const [isPollScreen, setIsPollScreen] = useState(false);
  // const [routes] = React.useState([
  //   {key: 'poll', title: 'poll'},
  //   {key: 'survey', title: 'survey'},
  // ]);

  // const renderScene = ({route, jumpTo}: {route: any; jumpTo: any}) => {
  //   switch (route?.key) {
  //     case 'poll':
  //       return <PollScreen {...route} jumpTo={jumpTo} isPollScreen={true} />;
  //     case 'survey':
  //       return <PollScreen {...route} jumpTo={jumpTo} isPollScreen={false} />;
  //   }
  // };

  // const renderTabBar = (props: any) => {
  //   return (
  //     <TabBar
  //       {...props}
  //       pressColor={'transparent'}
  //       style={{
  //         backgroundColor: colors.AppTheme.Secondary,
  //         // shadowColor: '#000',
  //         // shadowOffset: {
  //         //   width: 0,
  //         //   height: 1,
  //         // },
  //         // shadowOpacity: 0.22,
  //         // shadowRadius: 2.22,
  //         // elevation: 3,
  //         elevation: 0,
  //         height: ms(50),
  //         justifyContent: 'center',
  //       }}
  //       indicatorStyle={{backgroundColor: colors.AppTheme.Primary}}
  //       renderLabel={({route}) => {
  //         const isPoll = route?.key === 'poll';
  //         return (
  //           <CustomText
  //             textStyle={{
  //               color: colors.AppTheme.Primary,
  //               fontSize: ms(16),
  //             }}>
  //             {isPoll ? 'Poll' : 'Survey'}
  //           </CustomText>
  //         );
  //       }}
  //     />
  //   );
  // };

  // return (
  //   <>
  //     <Header
  //       title={appConstants.appName}
  //       isUser={true}
  //       isNotification={true}
  //     />
  //     <TabView
  //       renderTabBar={renderTabBar}
  //       navigationState={{index, routes}}
  //       animationEnabled={true}
  //       renderScene={renderScene}
  //       onIndexChange={setIndex}
  //       initialLayout={{width: layout.width}}
  //     />
  //   </>
  // );
  const userData = useUserData();
  const feedSelector = useFeedSelector();
  const feedData = useFeedData();
  const dispatch = useDispatch();
  const FlatListRef = useRef<FlatList>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);
  const [footerLoading, setFooterLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOffset(0);
    NetInfo.fetch().then(st => {
      if (!st.isConnected) {
        showToast(messages.noInterNet);
      }
    });
    getInitPosts();
    getInitSurveys();
    const emit = Emmiter.addListener('getFeed', () => {
      getInitPosts();
      getInitSurveys();
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
  }, [feedSelector]);

  const onRefreshFlatList = () => {
    setRefreshing(true);
    setOffset(0);
    getInitPosts();
  };

  const getInitPosts = async () => {
    setLoading(true);
    try {
      const result = await API.graphql(
        graphqlOperation(Query.getPosts, {
          user_id: userData?.user_id,
          offset: 0,
          type: feedSelector,
        }),
      );
      dispatch(
        feedSliceActions.setFeedDataAction({
          collectionName: 'posts',
          data: result?.data?.getAllPost,
        }),
      );
      setRefreshing(false);
      setOffset(val => val + 10);
      setLoading(false);
    } catch (error) {
      console.log(
        'ERROR in file: feedScreen.tsx:179 ~ getInitPosts',
        error?.errors[0]?.message,
      );
      setRefreshing(false);
      setLoading(false);
    }
  };

  const getInitSurveys = async () => {
    setLoading(true);
    try {
      const result = await API.graphql(
        graphqlOperation(Query.getAllSurvey, {
          user_id: userData?.user_id,
          // type: feedSelector,
          offset: 0,
        }),
      );
      dispatch(
        feedSliceActions.setFeedDataAction({
          collectionName: 'surveys',
          data: result?.data?.getAllSurvey,
        }),
      );
      setRefreshing(false);
      setOffset(val => val + 10);
      setLoading(false);
    } catch (error) {
      console.log(
        'ERROR in file: feedScreen.tsx:210 ~ getInitSurveys',
        error?.errors[0]?.message,
      );
      setRefreshing(false);
      setLoading(false);
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
          type: feedSelector,
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
      console.log(
        'ERROR in file: feedScreen.tsx:115 ~ getMorePosts',
        error?.errors[0]?.message,
      );
      setFooterLoading(false);
    }
  };

  const renderFooterComponent = () => {
    if (footerLoading) {
      return (
        <View style={feedScreenStyle.bottomIcon}>
          <ActivityIndicator size="large" color={colors.AppTheme.Primary} />
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={feedScreenStyle.container}>
      <Header
        title={appConstants.appName}
        isUser={true}
        isNotification={true}
      />
      {loading ? (
        <Loading Size={'large'} Color={colors.AppTheme.Primary} />
      ) : feedData.length === 0 ? (
        <PostNotFound />
      ) : (
        <View style={{marginTop: ms(8)}}>
          <FlatList
            data={feedData}
            ref={FlatListRef}
            renderItem={({item, index}) => (
              <FeedCard
                item={item}
                index={index}
                routeName={appConstants.posts}
              />
            )}
            keyExtractor={item => item?.post_id}
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
                onRefresh={onRefreshFlatList}
              />
            }
            ListFooterComponent={renderFooterComponent}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default FeedScreen;
