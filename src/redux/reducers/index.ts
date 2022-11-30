import {combineReducers} from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import { feedPersistConfig, feedSliceReducer } from './feedSlice/feedSlice';
import {userPersistConfig, userReducer} from './user-slice/userSlice';

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  feed: persistReducer(feedPersistConfig, feedSliceReducer),
});

export default rootReducer;
