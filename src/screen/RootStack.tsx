import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import ChattingRoom from './ChattingRoom';
import MainScreen from './MainScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type RootStackParamList = {
  ChattingRoom: {
    id: number;
  };
  Main: undefined;
};

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={MainScreen} name="Main" />
      <Stack.Screen component={ChattingRoom} name="ChattingRoom" />
    </Stack.Navigator>
  );
}
