import React, {useEffect, useState} from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNameEnum from '../helper/screenNameEnum';
import AuthNavigation from './authNavigation';
import FeedNavigation from './feedNavigation';
import BottomTabNavigation from './bottomTabNavigation';
import {useUserData} from '../redux/reducers/user-slice/userSlice';
import CreateFeed from '../screens/create-feed/CreateFeed';
import CreateFeedImage from '../screens/create-feed/CreateFeedImage';
import UserInterest from '../screens/auth/userInterest/userInterest';
import EditProfileScreen from '../screens/profile/editProfileScreen';
import TopTabNavigation from '../screens/profile/followers-following/topTabNavigation';
import Notification from '../screens/notification/Notification';
import SplashScreen from '../screens/splash/Splash';
import CreateSurveyScreen from '../screens/createSurvey/createSurvey';

const RootStack = createNativeStackNavigator();

const deepLinksConf = {
  initialRouteName: 'BottomTabNavigation',
  screens: {
    FeedNavigation: {
      screens: {
        ProfileScreen: {
          path: 'user/:userId',
          parse: {userId: id => id},
        },
        FeedDetailsView: {
          path: 'feed/:postId',
          parse: {postId: id => id},
        },
      },
    },
  },
};

const linking: LinkingOptions = {
  prefixes: ['plebiscite://', 'https://mythought.page.link'],
  config: deepLinksConf,
};

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
    route: screenNameEnum.CreateSurveyScreen,
    label: 'CreateSurveyScreen',
    component: CreateSurveyScreen,
  },
  {
    route: screenNameEnum.EditProfileScreen,
    label: 'EditProfileScreen',
    component: EditProfileScreen,
  },
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
  {
    route: screenNameEnum.SplashScreen,
    label: 'SplashScreen',
    component: SplashScreen,
  },
];

const AppNavigation = () => {
  const userData = useUserData();
  const [isSplashScreen, setSplashScreen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSplashScreen(true);
    }, 2000);
  }, []);

  return (
    <NavigationContainer linking={linking}>
      {!isSplashScreen && <SplashScreen />}
      {isSplashScreen && (
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
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;
