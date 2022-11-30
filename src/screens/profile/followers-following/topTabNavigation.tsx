import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FollowersScreen from './followersScreen';
import FollowingScreen from './followingScreen';
import {
  NavigationContainer,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import screenNameEnum from '../../../helper/screenNameEnum';
import Header from '../../../components/header/header';
import {ms} from 'react-native-size-matters';
import colors from '../../../theme/colors/colors';

const Tab = createMaterialTopTabNavigator();

interface TabButtonInterface {
  state: any;
  descriptors: any;
  navigation: any;
  position: any;
}

const TopTabNavigation = () => {
  const route = useRoute();
  const [headerText, setHeaderText] = useState(route?.params?.heading);

  const FollowersComponent = () => {
    return <FollowersScreen setHeaderText={setHeaderText} />;
  };

  const FollowingComponent = () => {
    return <FollowingScreen setHeaderText={setHeaderText} />;
  };

  return (
    <>
      <Header
        title={headerText}
        isBack={true}
        isNotification={false}
        isUser={false}
        isProfile={false}
      />
      <Tab.Navigator
        backBehavior="none"
        initialRouteName={headerText}
        screenOptions={screenOptions}
        style={{
          backgroundColor: colors.AppTheme.Secondary,
        }}>
        <Tab.Screen
          name={'Followers'}
          initialParams={{userId: route.params?.userId}}
          component={FollowersComponent}
        />
        <Tab.Screen
          name={'Following'}
          initialParams={{userId: route.params?.userId}}
          component={FollowingComponent}
        />
      </Tab.Navigator>
    </>
  );
};

const screenOptions = {
  tabBarActiveTintColor: colors.AppTheme.Primary,
  tabBarInactiveTintColor: colors.AppTheme.PlaceholderColor,
  tabBarStyle: {
    elevation: 0,
    shadowOffset: {height: 0, width: 0},
    backgroundColor: colors.AppTheme.Secondary,
    height: ms(50),
    justifyContent: 'center',
  },
  tabBarLabelStyle: {
    fontSize: ms(16),
    textTransform: 'none',
    fontWeight: 'bold',
  },
  tabBarIndicatorStyle: {
    backgroundColor: colors.AppTheme.Primary,
  },
  tabBarPressColor: 'transparent',
};

export default TopTabNavigation;
