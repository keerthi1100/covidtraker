/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import ExpandExample from './src/ExpandExample';

import AppNaviagation from './src/navigation/TabNavigation';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppNaviagation);
