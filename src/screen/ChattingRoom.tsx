// /* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  NativeModules,
  View,
  Platform,
  Keyboard,
} from 'react-native';
import ChattingRoomInput from '../components/ChattingRoomInput';
import SpeechBallonsInChattinRoom from '../components/SpeechBallonsInChattingRoom';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStack';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
  ImagePickerResponse,
} from 'react-native-image-picker';
import dayjs from 'dayjs';
import _ from 'lodash';
import axios, {AxiosPromise} from 'axios';
import useSendImage from '../hooks/useSendImage';
import useNickname from '../hooks/useNickname';

export type Chatting = {
  type: string;
  chatId: number;
  senderId: number;
  senderIp: number;
  senderNickname: string;
  recieverId: number;
  recieverNickname: string;
  roomId: number;
  contents: string;
  image: string;
  isRead: boolean;
  date: string;
};

const DATA: Chatting[] = [
  {
    type: 'chat',
    chatId: 1,
    senderId: 123,
    senderIp: 123123,
    senderNickname: '이명섭',
    recieverId: 321,
    recieverNickname: 'Myoung',
    roomId: 1,
    contents: '안녕하세요asdfdf',
    image: '21ㄴㅁㄴㅇㅁㄴㅇㄴ',
    isRead: true,
    date: '2022-05-09T18:46:02',
  },
  {
    type: 'chat',
    chatId: 2,
    senderId: 123,
    senderIp: 123123,
    senderNickname: 'Myoung',
    recieverId: 321,
    recieverNickname: '이명섭',
    roomId: 1,
    contents: '네 반갑습니다',
    image: '21ㄴㅁㄴㅇㅁㄴㅇㄴ',
    isRead: true,
    date: '2022-05-09T18:46:02',
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'ChattingRoom'>;

export default function ChattingRoom({navigation, route}: Props) {
  const [data, setData] = useState<Chatting[]>(DATA);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const {StatusBarManager} = NativeModules;
  const {nickname} = useNickname();
  const {mutate: sendImageToServer, isLoading: sendImageLoading} =
    useSendImage();

  const chatRef = useRef<null | WebSocket>(null);

  const onSendMessage = async (contents: string) => {
    const date: string = dayjs().format('YYYY-MM-DDTHH:mm:ss');
    const chat: Chatting = {
      type: 'chat',
      chatId: data[data.length - 1].chatId + 1,
      senderId: 123,
      senderIp: 123123,
      senderNickname: '이명섭',
      recieverId: 321,
      recieverNickname: 'Myoung',
      roomId: 1,
      contents: contents,
      image: '21ㄴㅁㄴㅇㅁㄴㅇㄴ',
      isRead: false,
      date: date,
    };
    setData([...data, chat]);
  };

  const onSendImage = () => {
    const date: string = dayjs().format('YYYY-MM-DDTHH:mm:ss');
    const imageChatting: Chatting = {
      type: 'image',
      chatId: data[data.length - 1].chatId + 1,
      senderId: 123,
      senderIp: 123123,
      senderNickname: '이명섭',
      recieverId: 321,
      recieverNickname: 'Myoung',
      roomId: 1,
      contents: 'ASdsd',
      image: '21ㄴㅁㄴㅇㅁㄴㅇㄴ',
      isRead: false,
      date: date,
    };
    chatRef.current?.send(JSON.stringify(imageChatting));
  };

  const onSelectPhoto = async (): Promise<ImagePickerResponse> => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 1,
      selectionLimit: 0,
    };

    const organizingSelectedPhotos = async (
      value: Asset[] | undefined,
    ): Promise<any> => {
      const formdata = new FormData();
      value?.forEach(item => {
        formdata.append('image[]', {
          name: item.fileName,
          uri:
            Platform.OS === 'ios' ? item.uri?.replace('file://', '') : item.uri,
          type: item.type,
        });
      });
      formdata.append('senderNickname', nickname);
      await sendImageToServer(formdata);
    };

    const result = await launchImageLibrary(
      options,
      async (res: ImagePickerResponse) => {
        if (res.didCancel) {
          return;
        }
        try {
          await onSendImage();
          await organizingSelectedPhotos(res.assets);
          Keyboard.dismiss();
        } catch (e) {
          console.log(e);
        }
      },
    );
    return result;
  };

  useEffect(() => {
    chatRef.current = new WebSocket('ws://49.247.31.138:30333');
    chatRef.current.onopen = () => {
      const connect: Chatting = {
        type: 'connect',
        chatId: 1,
        senderId: 1,
        senderIp: 1,
        senderNickname: nickname,
        recieverId: 2,
        recieverNickname: '임의',
        roomId: 1,
        contents: '입장',
        image: 'QEWEEW',
        isRead: false,
        date: '!@#@#@',
      };
      if (chatRef.current?.readyState === 1) {
        const debounce = _.debounce(() => {
          chatRef.current?.send(JSON.stringify(connect));
          console.log('들어감');
        }, 500);
        debounce();
      }
    };
    chatRef.current.onmessage = (e: WebSocketMessageEvent) => {
      console.log('메시지', e.data);
    };
    chatRef.current.onerror = (e: WebSocketErrorEvent) => {
      console.log('에러', e.message);
    };
    chatRef.current.onclose = (e: WebSocketCloseEvent) => {
      console.log('닫힘', e);
    };
    return () => {
      chatRef.current?.close();
    };
  });

  useEffect(() => {
    Platform.OS === 'ios'
      ? StatusBarManager.getHeight((statusBarFrameData: any) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, [StatusBarManager]);

  if (Platform.OS === 'android') {
    return (
      <View style={styles.container}>
        <SpeechBallonsInChattinRoom data={data} />
        <ChattingRoomInput
          onPress={(contents: string) => onSendMessage(contents)}
          onSelectPhoto={onSelectPhoto}
        />
      </View>
    );
  } else {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={'padding'}
        keyboardVerticalOffset={44 + statusBarHeight}>
        <SpeechBallonsInChattinRoom data={data} />
        <ChattingRoomInput
          onPress={(contents: string) => onSendMessage(contents)}
          onSelectPhoto={onSelectPhoto}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8bedd',
    width: '100%',
  },
});
