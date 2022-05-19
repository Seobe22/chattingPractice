/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {Text, TextInput, Platform} from 'react-native';
import {name as appName} from './app.json';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
Platform.OS === 'ios' ? null : (Text.defaultProps.includeFontPadding = false);
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
Platform.OS === 'ios'
  ? null
  : (TextInput.defaultProps.includeFontPadding = false);

AppRegistry.registerComponent(appName, () => App);
