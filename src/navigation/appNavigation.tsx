import React, {useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNameEnum from '../helper/screenNameEnum';
import AuthNavigation from './authNavigation';
import FeedNavigation from './feedNavigation';
import BottomTabNavigation from './bottomTabNavigation';
import {useUserData} from '../redux/reducers/user-slice/userSlice';
import FeedDetailsView from '../screens/feed/feedDetailsView/feedDetailsView';
import CreateFeed from '../screens/create-feed/CreateFeed';
import CreateFeedImage from '../screens/create-feed/CreateFeedImage';
import UserInterest from '../screens/auth/userInterest/userInterest';
import EditProfileScreen from '../screens/profile/editProfileScreen';
import FollowersScreen from '../screens/profile/followers-following/followersScreen';
import TopTabNavigation from '../screens/profile/followers-following/topTabNavigation';
import FollowingScreen from '../screens/profile/followers-following/followingScreen';
import Notification from '../screens/notification/Notification';

const RootStack = createNativeStackNavigator();

const routes = [
  {
    route: screenNameEnum.BottomTabNavigation,
    label: 'BottomTabNavigation',
    component: BottomTabNavigation,
  },
  {
    route: screenNameEnum.FeedNavigation,
    label: 'FeedNavigation',
    component: FeedNavigation,
  },
  {
    route: screenNameEnum.FeedDetailsView,
    label: 'FeedDetailsView',
    component: FeedDetailsView,
  },
  {
    route: screenNameEnum.UserInterest,
    label: 'UserInterest',
    component: UserInterest,
  },
  {
    route: screenNameEnum.CreateFeed,
    label: 'CreateFeed',
    component: CreateFeed,
  },
  {
    route: screenNameEnum.CreateFeedImage,
    label: 'CreateFeedImage',
    component: CreateFeedImage,
  },
  {
    route: screenNameEnum.EditProfileScreen,
    label: 'EditProfileScreen',
    component: EditProfileScreen,
  },
  // {
  //   route: screenNameEnum.FollowersScreen,
  //   label: 'FollowersScreen',
  //   component: FollowersScreen,
  // },
  // {
  //   route: screenNameEnum.FollowingScreen,
  //   label: 'FollowingScreen',
  //   component: FollowingScreen,
  // },
  {
    route: screenNameEnum.TopTabNavigation,
    label: 'TopTabNavigation',
    component: TopTabNavigation,
  },

  {
    route: screenNameEnum.Notification,
    label: 'Notification',
    component: Notification,
  },
];

const AppNavigation = () => {
  const userData = useUserData();

  console.log(userData, 'user data <<<<<<<<<<<');

  const navTheme = DefaultTheme;
  navTheme.colors.background = '#FFF';

  return (
    <NavigationContainer theme={navTheme}>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {userData ? (
          <>
            {routes.map(item => {
              return (
                <RootStack.Screen
                  key={item.label}
                  name={item.route}
                  component={item.component}
                />
              );
            })}
          </>
        ) : (
          <>
            <RootStack.Screen
              name={screenNameEnum.AuthStack}
              component={AuthNavigation}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
