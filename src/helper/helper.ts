import RNFS from 'react-native-fs';
import {Linking, Platform} from 'react-native';
import Toast from 'react-native-root-toast';
import {EventEmitter} from 'fbemitter';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export const Emmiter = new EventEmitter();

export const removeSpace = (text: string) => {
  const trimEndText = text.trimEnd();
  const trimmedText = trimEndText.trimStart();
  return trimmedText;
};

export const showToast = (msg, duration = Toast.durations.SHORT) => {
  Toast.show(msg, {
    duration: duration,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
};

export interface PhotoModel {
  uri: string;
  group_name: string;
  fileSize: number | string;
  filename: string;
  height: number;
  width: number;
  timestamp: number;
  type: string;
  isSelected?: boolean;
}

export const getUploadMediaUrl = async (objMedia: PhotoModel) => {
  if (Platform.OS === 'ios') {
    if (objMedia.uri.includes('file:///')) {
      return objMedia?.uri;
    }
    const appleId = objMedia.uri.substring(5, 41);
    const ext = objMedia.type === 'image' ? 'JPG' : 'mp4';
    const encodedUri = `assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext}`;
    const destPath = `${RNFS.TemporaryDirectoryPath}${Math.random()
      .toString(36)
      .substring(7)}.${ext}`;
    let uri = objMedia.uri;
    if (objMedia.type === 'image') {
      uri = await RNFS.copyAssetsFileIOS(
        encodedUri,
        destPath,
        objMedia.width || 500,
        objMedia.height || 500,
        1.0,
        1.0,
        'contain',
      );
    } else {
      uri = await RNFS.copyAssetsVideoIOS(encodedUri, destPath);
    }
    // debugLogs('local media url', uri);
    return `file://${uri}`;
  } else {
    // debugLogs('Media url', objMedia.uri);
    return objMedia.uri;
  }
};

export const createShareLink = async (postId: string) => {
  const link = await dynamicLinks().buildShortLink(
    {
      link: `https://mythought.page.link/feed/${postId}`,
      // ios: {
      //   bundleId: <bundle_id>,
      //   appStoreId: <appstore_id>,
      // },
      domainUriPrefix: 'https://mythought.page.link',
      android: {
        packageName: 'com.Plebiscite',
      },
    },
    dynamicLinks.ShortLinkType.SHORT,
  );

  return link;
};

export const UseNumberFormate = (text: number | bigint) => {
  var nf = new Intl.NumberFormat(
    Intl.DateTimeFormat().resolvedOptions().locale,
    {notation: 'compact', compactDisplay: 'short'},
  ).format(text);

  return +nf;
};

export const validateEmail = (text:string) => {
  let regex = new RegExp(/^([A-Za-z0-9_\-\.])+\@([A-Za-z_\-\.])+\.([A-Za-z]{2,4})$/);
  let res = regex.test(text);
  return res;
} 

export const getFireBaseToken = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  return token;
}

export const notificationGenerator = async (message) => {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: '123',
      name: 'Plebiscite',
    });
    await notifee.displayNotification({
      title: message.data.title,
      body: message.data.body,
      data: {url: message.data.url},
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon',
        // pressAction: {
        //   id: 'default',
        // },
      },
    });
}

export const openUrl = async (data) => {
  const link = data.replace('https://mythought.page.link','plebiscite:/')

  Linking.canOpenURL(link).then(() => {
    console.log('URL works');
    Linking.openURL(link).catch(error => {
      console.log('An error has occurred in URL:', error);
    });
  });
}
