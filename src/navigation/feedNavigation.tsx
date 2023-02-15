import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNameEnum from '../helper/screenNameEnum';
import FeedScreen from '../screens/feed/feedScreen/feedScreen';
import FeedDetailsView from '../screens/feed/feedDetailsView/feedDetailsView';
import FeedCard from '../components/card/feedCard';
import PollQuestion from '../screens/feed/poll/pollQuestion';
import AboutNavigation from './aboutNavigation';
import ChangePassword from '../screens/auth/changePassword/changePassword';
import EditProfileScreen from '../screens/profile/editProfileScreen';
import ProfileScreen from '../screens/profile/myProfile/profileScreen';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Notification from '../screens/notification/Notification';
import {useNavigation, useRoute} from '@react-navigation/native';
import notifee, {EventType} from '@notifee/react-native';
import {openUrl} from '../helper/helper';
import SurveyScreen from '../screens/survey/SurveyScreen';
import SurveyDetail from '../screens/survey/surveyDetail/surveyDetail';

const RootStack = createNativeStackNavigator();

const routes = [
  {
    route: screenNameEnum.FeedScreen,
    label: 'FeedScreen',
    component: FeedScreen,
  },
  {
    route: screenNameEnum.PollQuestion,
    label: 'PollQuestion',
    component: PollQuestion,
  },
  {
    route: screenNameEnum.FeedDetailsView,
    label: 'FeedDetailsView',
    component: FeedDetailsView,
  },
  {
    route: screenNameEnum.EditProfileScreen,
    label: 'MyProfile',
    component: EditProfileScreen,
  },
  {
    route: screenNameEnum.FeedCard,
    label: 'FeedCard',
    component: FeedCard,
  },
  {
    route: screenNameEnum.AboutStack,
    label: 'AboutStack',
    component: AboutNavigation,
  },
  {
    route: screenNameEnum.ChangePassword,
    label: 'ChangePassword',
    component: ChangePassword,
  },
  {
    route: screenNameEnum.ProfileScreen,
    label: 'ProfileScreen',
    component: ProfileScreen,
  },
  {
    route: screenNameEnum.Notification,
    label: 'Notification',
    component: Notification,
  },
  {
    route: screenNameEnum.SurveyScreen,
    label: 'SurveyScreen',
    component: SurveyScreen,
  },
  {
    route: screenNameEnum.SurveyDetail,
    label: 'SurveyDetail',
    component: SurveyDetail,
  },
];

const FeedNavigation = () => {
  const navigation = useNavigation();

  useEffect(() => {
    notifee.onForegroundEvent(async ({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          openUrl(detail?.notification?.data?.url);
          break;
      }
    });

    //foreground listener
    const unsubscribe = dynamicLinks().onLink(link => {
      if (link) {
        openUrl(link?.url);
      }
    });
    //background listener
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link) {
          openUrl(link?.url);
        }
      });
    return () => unsubscribe();
  }, []);

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {routes.map(item => {
        return (
          <RootStack.Screen
            key={item.label}
            name={item.route}
            component={item.component}
          />
        );
      })}
    </RootStack.Navigator>
  );
};

export default FeedNavigation;
