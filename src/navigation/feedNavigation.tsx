import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNameEnum from '../helper/screenNameEnum';
import FeedScreen from '../screens/feed/feedScreen/feedScreen';
import FeedDetailsView from '../screens/feed/feedDetailsView/feedDetailsView';
import FeedCard from '../components/card/feedCard';
import PollQuestion from '../screens/feed/poll/pollQuestion';
import FeedCommentScreen from '../screens/feed/feedDetailsView/feedCommentScreen';
import AboutNavigation from './aboutNavigation';
import ChangePassword from '../screens/auth/changePassword/changePassword';
import EditProfileScreen from '../screens/profile/editProfileScreen';
import ProfileScreen from '../screens/profile/myProfile/profileScreen';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Notification from '../screens/notification/Notification';
import { useNavigation } from '@react-navigation/native';
// import ProfileScreen from '../screens/profile/myProfile/profileScreen';

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
    route: screenNameEnum.FeedCommentScreen,
    label: 'FeedCommentScreen',
    component: FeedCommentScreen,
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
];

const FeedNavigation = () => {

  const navigation = useNavigation();

  useEffect(()=>{
    //background listener
    const unsubscribe = dynamicLinks().onLink((link)=>{
      handleDynamicLink(link)
    });
    //foreground listener
    dynamicLinks().getInitialLink().then((link)=>{
      handleDynamicLink(link)
    });
    return () => unsubscribe();

  },[])

  const handleDynamicLink = (link) => {
    if(link?.url){
      setTimeout(() => {
        navigation.navigate(screenNameEnum.FeedDetailsView,{postId: link?.url})
      }, 200);
    }else{
      return ;
    }
  }

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
