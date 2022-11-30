/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';
import { Amplify } from "aws-amplify";
import awsExports from "./src/aws-exports";


if(!__DEV__){
    console.log = () => {};
}

Amplify.configure(awsExports);
AppRegistry.registerComponent(appName, () => App);
