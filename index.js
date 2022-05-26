/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

import {name as appName} from './app.json';

messaging().setBackgroundMessageHandler(onMessageReceived);

function FakeApp() {
  return null;
}

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    return <FakeApp />;
  }
  return <App />;
}

async function onMessageReceived(message) {
  const channelId = await notifee.createChannel({
    id: 'Errand',
    name: 'chatting',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
    vibration: true,
    vibrationPattern: [200, 500],
  });
  console.log('백그라운드 메시지', message);
  await notifee.displayNotification({
    title: message.notification?.title + 'dkdkdkdkdk',
    body: message.notification?.body,
    android: {
      channelId,
      asForegroundService: true,
      importance: AndroidImportance.HIGH,
    },
    ios: {
      critical: true,
    },
  });
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
