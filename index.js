/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {App, StrictModeApp} from './App2';
import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => StrictModeApp);
