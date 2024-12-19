/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import { MessageController } from './messageController';
import {name as appName} from './app.json';
console.log = (ms) => MessageController.log(ms)
console.error = (ms) => MessageController.error(ms)
console.warn = (ms) => MessageController.warn(ms)
AppRegistry.registerComponent(appName, () => App);
