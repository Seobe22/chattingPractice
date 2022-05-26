/* eslint-disable */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStack';
import useInput from '../hooks/useInput';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import useNickname from '../hooks/useNickname';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export default function MainScreen({navigation}: Props) {
  const {onSetNickname} = useNickname();
  const onMoveChattingRoom = (): void => {
    if (nickname.value === '') {
      return Alert.alert('닉네임을 입력해주세요.');
    }
    onSetNickname(nickname.value);
    navigation.navigate('ChattingRoom', {id: 1, nickname: nickname.value});
  };

  const onMoveMap = (): void => {
    navigation.navigate('Map');
  };

  const onMoveRegister = (): void => {
    navigation.navigate('Register', {type: 'register'});
  };

  const onMoveRequestErrend = () => {
    navigation.navigate('RequestErrand');
  };

  const onMoveCalendar = () => {
    navigation.navigate('Calendar');
  };

  const onDisplayNotification = async (): Promise<void> => {
    await notifee.displayNotification({
      title: '테스트 알림',
      body: '잘 나오나요?',
      android: {
        channelId: 'Errand',
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
      },
      ios: {
        foregroundPresentationOptions: {
          sound: true,
        },
        critical: true,
      },
    });
  };
  const nickname = useInput();

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.nicknameInput}
          placeholder="닉네임을 입력하세요"
          value={nickname.value}
          onChangeText={nickname.onChangeText}
        />
        <TouchableOpacity
          style={styles.enterChattingRoomButton}
          onPress={onMoveChattingRoom}>
          <Text>채팅방 입장</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.enterChattingRoomButton, {marginTop: 16}]}
          onPress={onMoveMap}>
          <Text>지도 입장</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.enterChattingRoomButton, {marginTop: 16}]}
          onPress={onMoveRegister}>
          <Text>회원가입 입장</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.enterChattingRoomButton, {marginTop: 16}]}
          onPress={onMoveRequestErrend}>
          <Text>심부름 요청</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.enterChattingRoomButton, {marginTop: 16}]}
          onPress={onMoveCalendar}>
          <Text>데이트타임피커</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.enterChattingRoomButton, {marginTop: 16}]}
          onPress={onDisplayNotification}>
          <Text>알림 테스트</Text>
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
  nicknameInput: {
    width: '100%',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});
