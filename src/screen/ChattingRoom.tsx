import React, {useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import ChattingRoomInput from '../components/ChattingRoomInput';
import SpeechBallonsInChattinRoom from '../components/SpeechBallonsInChattingRoom';

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
  },
];

type Subscribe = {
  commend: string;
  channel: number;
};

export default function ChattingRoom() {
  const [data, setData] = useState<Chatting[]>(DATA);
  const chatRef = useRef<any>(null);
  const onSendMessage = async (contents: string) => {
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
    };
    setData([...data, chat]);
  };

  useEffect(() => {
    chatRef.current = new WebSocket('ws://49.247.198.102:30333');
    chatRef.current.onopen = () => {
      const subscribe: Subscribe = {
        channel: 2,
        commend: 'subscribe',
      };
      chatRef.current.send(JSON.stringify(subscribe));
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
      chatRef.current.close();
    };
  }, []);

  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <SpeechBallonsInChattinRoom data={data} />
      </KeyboardAvoidingView>
      <ChattingRoomInput
        onPress={(contents: string) => onSendMessage(contents)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8bedd',
    width: '100%',
  },
});
