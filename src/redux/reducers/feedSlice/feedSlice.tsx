import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import appConstants from '../../../helper/appConstant';

const initialState = {
  posts: [],
  myPosts: [],
};

const feedSlice = createSlice({
  name: 'feed',
  initialState: initialState,
  reducers: {
    setFeedDataAction: (state, action) => {
      state[action.payload.collectionName] = action.payload.data;
    },
    voteAction: (state, action) => {
      let items = JSON.parse(JSON.stringify(state[action.payload.routeName]));
      let index = _.findIndex(items, {post_id: action.payload.id});
      let optionIndex = _.findIndex(items[index].options, {
        option_id: action.payload.optionId,
      });
      console.log(index, 'index of post in redux');
      console.log(optionIndex, 'optionIndex of post in redux');

      items[index].total_votes++;
      if (items[index].already_voted === false) {
        items[index].already_voted = true;
      }
      items[index].options[optionIndex].vote++;

      state[action.payload.routeName] = items;
    },
    deletePostAction: (state, action) => {
      let items = JSON.parse(JSON.stringify(state[action.payload.routeName]));
      const indexId = _.filter(items, {post_id: action.payload.id});
      _.remove(items, function (c) {
        return c.post_id === indexId[0].post_id;
      });

      state[action.payload.routeName] = items;
    },
    clearFeedData: (state, action) => {
      state.posts = [];
      state.myPosts = [];
    },
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

export const useMyFeedData = () => {
  const user = useSelector(state => state?.feed?.myPosts);
  return user;
};
