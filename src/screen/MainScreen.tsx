/* eslint-disable */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export default function MainScreen({navigation}: Props) {
  const onMoveChattingRoom = () => {
    navigation.navigate('ChattingRoom', {id: 1});
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.enterChattingRoomButton}
          onPress={onMoveChattingRoom}>
          <Text>채팅방 입장</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 30,
    justifyContent: 'center',
    alignItem: 'center',
  },
  inputContainer: {
    marginVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    backgroundColor: '#e3e3e3',
    borderRadius: 5,
  },
  mapContainer: {width: '100%', flex: 0.5},
  enterChattingRoomButton: {
    width: '100%',
    backgroundColor: '#e3e3e3',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
