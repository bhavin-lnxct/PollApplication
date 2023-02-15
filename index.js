/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';
import { Amplify } from "aws-amplify";
import awsExports from "./src/aws-exports";
import messaging from '@react-native-firebase/messaging';
import { notificationGenerator, openUrl } from './src/helper/helper';
import notifee, { EventType } from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    notificationGenerator(remoteMessage)
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
    switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          openUrl(detail?.notification?.data?.url);
          break;
    }
});

if(!__DEV__){
    console.log = () => {};
}
function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
    return <App />;
  }

Amplify.configure(awsExports);
AppRegistry.registerComponent(appName, () => HeadlessCheck);
