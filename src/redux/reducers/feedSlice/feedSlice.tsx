import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import appConstants from '../../../helper/appConstant';

const initialState = {
  posts: [],
  myPosts: [],
  mySurveys: [],
  feedDetail: null,
  surveys: [],
};

const feedSlice = createSlice({
  name: 'feed',
  initialState: initialState,
  reducers: {
    setFeedDataAction: (state, action) => {
      state[action.payload.collectionName] = action.payload.data;
    },
    voteAction: (state, action) => {
      let items = JSON.parse(JSON.stringify(state.posts));
      let postIndex = _.findIndex(items, {post_id: action.payload.id});

      let myPostItems = JSON.parse(JSON.stringify(state.myPosts));
      let myPostIndex = _.findIndex(myPostItems, {post_id: action.payload.id});

      let feedDetailPostItems = JSON.parse(JSON.stringify(state.feedDetail));

      if (postIndex !== -1) {
        let optionIndex = _.findIndex(items[postIndex].options, {
          option_id: action.payload.optionId,
        });
        items[postIndex].total_votes++;
        if (items[postIndex].already_voted === false) {
          items[postIndex].already_voted = true;
        }
        items[postIndex].options[optionIndex].vote++;
      }
      if (myPostIndex !== -1) {
        let myPostOptionIndex = _.findIndex(myPostItems[myPostIndex].options, {
          option_id: action.payload.optionId,
        });
        myPostItems[myPostIndex].total_votes++;
        if (myPostItems[myPostIndex].already_voted === false) {
          myPostItems[myPostIndex].already_voted = true;
        }
        myPostItems[myPostIndex].options[myPostOptionIndex].vote++;
      }
      if (state.feedDetail !== null) {
        if (action.payload.id === feedDetailPostItems.post_id) {
          let feedDetailOptionIndex = _.findIndex(feedDetailPostItems.options, {
            option_id: action.payload.optionId,
          });
          feedDetailPostItems.total_votes++;
          if (feedDetailPostItems.already_voted === false) {
            feedDetailPostItems.already_voted = true;
          }
          feedDetailPostItems.options[feedDetailOptionIndex].vote++;
        }
      }

      state.posts = items;
      state.myPosts = myPostItems;
      state.feedDetail = feedDetailPostItems;
    },
    deletePostAction: (state, action) => {
      let items = JSON.parse(JSON.stringify(state.posts));
      let postIndex = _.findIndex(items, {post_id: action.payload.id});

      let myPostItems = JSON.parse(JSON.stringify(state.myPosts));
      let myPostIndex = _.findIndex(myPostItems, {post_id: action.payload.id});

      let feedDetailPostItems = JSON.parse(JSON.stringify(state.feedDetail));

      if (postIndex !== -1) {
        _.remove(items, function (c) {
          return c.post_id === items[postIndex].post_id;
        });
      }
      if (myPostIndex !== -1) {
        _.remove(myPostItems, function (c) {
          return c.post_id === myPostItems[myPostIndex].post_id;
        });
      }
      if (state.feedDetail !== null) {
        if (action.payload.id === feedDetailPostItems.post_id) {
          feedDetailPostItems = null;
        }
      }

      state.posts = items;
      state.myPosts = myPostItems;
      state.feedDetail = feedDetailPostItems;
    },
    clearFeedData: state => {
      state.posts = [];
      state.myPosts = [];
    },
    // setSurveyDataAction: (state, action) => {
    //   state.surveys = action.payload
    // }
  },
});

export const feedPersistConfig = {
  key: 'feed',
  storage: AsyncStorage,
};

export const feedSliceActions = feedSlice.actions;
export const feedSliceReducer = feedSlice.reducer;

export const useFeedData = () => {
  const user = useSelector(state => state?.feed?.posts);
  return user;
};

export const useSurveyData = () => {
  const user = useSelector(state => state?.feed?.surveys);
  return user;
};

export const useMyFeedData = () => {
  const user = useSelector(state => state?.feed?.myPosts);
  return user;
};

export const useFeedDetailData = () => {
  const user = useSelector(state => state?.feed?.feedDetail);
  return user;
};

export const UseMySurveyData = () => {
  const user = useSelector(state => state?.feed?.mySurveys);
  return user;
}
