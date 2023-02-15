import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';


const initialState = {
    notificationData: [],
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
      setNotificationData: (state, action) => {
        state.notificationData = action.payload;
      },
      deleteNotification: (state, action) => {
        let items = JSON.parse(JSON.stringify(state.notificationData));
        let notificationIndex = _.findIndex(items, {notification_id: action.payload.id});
        _.remove(items, function (c) {
            return c.notification_id === items[notificationIndex].notification_id;
        });
        state.notificationData = items;
      },
      deleteAllNotification: (state) => {
        state.notificationData = [];
      }
    },
});

export const notificationPersistConfig = {
    key: 'notification',
    storage: AsyncStorage,
};

export const notificationAction = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;

export const useNotificationData = () => {
    const user = useSelector(state => state?.notification?.notificationData);
    return user;
};
