import React, {useEffect, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import screenNameEnum from '../helper/screenNameEnum';
import {ms, ScaledSheet} from 'react-native-size-matters';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from '../components/icon/Icon';
import FeedNavigation from './feedNavigation';
import colors from '../theme/colors/colors';
import CreateFeedScreen from '../screens/create-feed/CreateFeedScreen';
import ProfileScreen from '../screens/profile/myProfile/profileScreen';
import EditProfileScreen from '../screens/profile/editProfileScreen';
import {SvgXml} from 'react-native-svg';
import svg from '../theme/svg/svg';

const Tab = createBottomTabNavigator();

const routes = [
  {
    route: screenNameEnum.FeedNavigation,
    label: 'FeedNavigation',
    type: 'Ionicons',
    icon: 'home-outline',
    component: FeedNavigation,
    name: svg.Home,
    name2: svg.HomeActive,
  },
  {
    route: screenNameEnum.CreateFeedScreen,
    label: 'CreateFeedScreen',
    type: 'Feather',
    icon: 'plus-square',
    component: CreateFeedScreen,
    name: svg.CreatePoll,
    name2: svg.CreatePollActive,
  },
  {
    route: screenNameEnum.EditProfileScreen,
    label: 'EditProfileScreen',
    type: 'FontAwesome',
    icon: 'user-circle-o',
    component: EditProfileScreen,
    name: svg.User,
    name2: svg.UserActive,
  },
];

const TabButton = (props: {
  item: any;
  onPress: any;
  accessibilityState: any;
}) => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef?.current?.animate({
        0: {scale: 0.5, translateY: 0},
        1: {scale: 1, translateY: -20},
      });
      circleRef?.current?.animate({
        0: {scale: 0},
        0.3: {scale: 0.9},
        0.5: {scale: 0.2},
        0.8: {scale: 0.7},
        1: {scale: 1},
      });
    } else {
      viewRef?.current?.animate({
        0: {scale: 1, translateY: -20},
        1: {scale: 0.5, translateY: 0},
      });
      circleRef?.current?.animate({
        0: {scale: 1},
        1: {scale: 0},
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={200} style={styles.container}>
        <View
          style={[
            focused ? {borderWidth: ms(0)} : {borderWidth: 0},
            styles.button,
          ]}>
          <Animatable.View
            ref={circleRef}
            duration={400}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: colors.AppTheme.Primary,
              borderRadius: ms(25),
            }}
          />

          <SvgXml
            xml={!focused ? item?.name : item?.name2}
            height={focused ? ms(30) : ms(48)}
            width={focused ? ms(30) : ms(48)}
          />
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {routes?.map(item => {
        return (
          <Tab.Screen
            key={item.label}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    borderColor: colors.AppTheme.Secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
