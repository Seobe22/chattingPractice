import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButtonProps} from '@react-navigation/elements';

import ChattingRoom from './ChattingRoom';
import MainScreen from './MainScreen';
import Map from './Map';
import Register from './Register';
import RequestErrand from './RequestErrand';
import Calendar from './Calendar';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type RootStackParamList = {
  ChattingRoom: {
    id: number;
    nickname: string;
  };
  Main: undefined;
  Map: undefined;
  Register: {
    type: 'register' | 'request';
  };
  RequestErrand: undefined;
  Calendar: undefined;
};

export default function RootStack() {
  const navigation = useNavigation();
  const onScreenBack = (e: HeaderBackButtonProps) => {
    if (e.canGoBack) {
      navigation.goBack();
    }
  };
  return (
    <Stack.Navigator>
      <Stack.Screen component={MainScreen} name="Main" />
      <Stack.Screen component={ChattingRoom} name="ChattingRoom" />
      <Stack.Screen component={Map} name="Map" />
      <Stack.Screen component={Calendar} name="Calendar" />
      <Stack.Screen
        component={Register}
        name="Register"
        options={{
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          title: '부르미',
          headerLeft: props => (
            <TouchableOpacity {...props} onPress={() => onScreenBack(props)}>
              <Image
                source={require('../../assets/images/backButton.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen component={RequestErrand} name="RequestErrand" />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  backIcon: {
    width: 19.2,
    height: 16,
  },
});
