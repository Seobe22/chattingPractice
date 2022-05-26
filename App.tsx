import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/screen/RootStack';
import {QueryClientProvider, QueryClient} from 'react-query';
import {Provider} from 'react-redux';
import {store} from './src/slices';
import {Text, Platform, TextInput} from 'react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
const queryClient = new QueryClient();

export default function App() {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  Platform.OS === 'ios' ? null : (Text.defaultProps.includeFontPadding = false);
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;
  Platform.OS === 'ios'
    ? null
    : (TextInput.defaultProps.includeFontPadding = false);

  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        const token = await messaging().getToken();
        notifee.requestPermission({criticalAlert: true});
        console.log(token);
      }
    }

    async function onMessageReceived(
      message: FirebaseMessagingTypes.RemoteMessage,
    ) {
      const channelId = await notifee.createChannel({
        id: 'Errand',
        name: 'chatting',
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        vibration: true,
        vibrationPattern: [200, 500],
      });
      console.log(message.data);
      await notifee.displayNotification({
        title: message.notification?.title,
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
    requestUserPermission();
    messaging().onMessage(onMessageReceived);
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <SafeAreaView style={{flex: 1}} edges={['top']}>
            <NavigationContainer>
              <RootStack />
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
}
