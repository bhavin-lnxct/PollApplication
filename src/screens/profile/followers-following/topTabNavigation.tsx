// import React, {useEffect, useState} from 'react';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import {
//   Animated,
//   Dimensions,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import FollowersScreen from './followersScreen';
// import FollowingScreen from './followingScreen';
// import {
//   NavigationContainer,
//   useFocusEffect,
//   useRoute,
// } from '@react-navigation/native';
// import screenNameEnum from '../../../helper/screenNameEnum';
// import Header from '../../../components/header/header';
// import {ms} from 'react-native-size-matters';
// import colors from '../../../theme/colors/colors';

// const Tab = createMaterialTopTabNavigator();

// interface TabButtonInterface {
//   state: any;
//   descriptors: any;
//   navigation: any;
//   position: any;
// }

// const TopTabNavigation = () => {
//   const route = useRoute();
//   const [headerText, setHeaderText] = useState(route?.params?.heading);

//   const FollowersComponent = () => {
//     return <FollowersScreen setHeaderText={setHeaderText} />;
//   };

//   const FollowingComponent = () => {
//     return <FollowingScreen setHeaderText={setHeaderText} />;
//   };

//   return (
//     <>
//       <Header
//         title={route?.params?.userName}
//         isBack={true}
//         isNotification={true}
//         isUser={false}
//         isProfile={false}
//       />
//       <Tab.Navigator
//         backBehavior="none"
//         initialRouteName={headerText}
//         screenOptions={screenOptions}
//         style={{
//           backgroundColor: colors.AppTheme.Secondary,
//         }}>
//         <Tab.Screen
//           name={'Followers'}
//           initialParams={{userId: route.params?.userId}}
//           component={FollowersComponent}
//         />
//         <Tab.Screen
//           name={'Following'}
//           initialParams={{userId: route.params?.userId}}
//           component={FollowingComponent}
//         />
//       </Tab.Navigator>
//     </>
//   );
// };

// const screenOptions = {
//   tabBarActiveTintColor: colors.AppTheme.Primary,
//   tabBarInactiveTintColor: colors.AppTheme.PlaceholderColor,
//   tabBarStyle: {
//     elevation: 0,
//     shadowOffset: {height: 0, width: 0},
//     backgroundColor: colors.AppTheme.Secondary,
//     height: ms(50),
//     justifyContent: 'center',
//   },
//   tabBarLabelStyle: {
//     fontSize: ms(16),
//     textTransform: 'none',
//     fontWeight: 'bold',
//   },
//   tabBarIndicatorStyle: {
//     backgroundColor: colors.AppTheme.Primary,
//   },
//   tabBarPressColor: 'transparent',
// };

// export default TopTabNavigation;

import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import followersFollowingStyle from './followersFollowingStyle';
import {TabBar, TabView} from 'react-native-tab-view';
import colors from '../../../theme/colors/colors';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
// import colors from '../../../../theme/colors/colors';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import FollowersScreen from './followersScreen';
import FollowingScreen from './followingScreen';
import Header from '../../../components/header/header';
import {useUserData} from '../../../redux/reducers/user-slice/userSlice';
import {ms} from 'react-native-size-matters';
import CustomText from '../../../components/text/CustomText';

const TopTabNavigation = () => {
  const layout = useWindowDimensions();
  const screenRoutes = useRoute();
  const item = screenRoutes?.params?.item;
  const [index, setIndex] = React.useState(screenRoutes?.params?.index || 0);
  const [routes] = React.useState([
    {key: 'followers', title: 'followers'},
    {key: 'following', title: 'following'},
  ]);

  const renderScene = ({route, jumpTo}: {route: any; jumpTo: any}) => {
    switch (route?.key) {
      case 'followers':
        return (
          <FollowersScreen
            {...route}
            jumpTo={jumpTo}
            userId={screenRoutes?.params?.userId}
          />
        );
      case 'following':
        return (
          <FollowingScreen
            {...route}
            jumpTo={jumpTo}
            userId={screenRoutes?.params?.userId}
          />
        );
    }
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      pressColor={'transparent'}
      style={{
        backgroundColor: colors.AppTheme.Secondary,
        elevation: 0,
        shadowOffset: {height: 0, width: 0},
        height: ms(50),
        justifyContent: 'center',
      }}
      indicatorStyle={{backgroundColor: colors.AppTheme.Primary}}
      renderLabel={({route}) => {
        const isFollowers = route?.key === 'followers';
        return (
          <CustomText
            textStyle={{
              color: colors.AppTheme.Primary,
              fontSize: ms(16),
            }}>
            {isFollowers ? 'Followers' : 'Following'}
          </CustomText>
        );
      }}
    />
  );

  return (
    <SafeAreaView style={followersFollowingStyle.container}>
      <Header
        title={item?.user_name}
        isBack={true}
        isNotification={true}
        isUser={false}
        isProfile={false}
      />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        style={{
          backgroundColor: colors.AppTheme.Secondary,
        }}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </SafeAreaView>
  );
};

export default TopTabNavigation;
