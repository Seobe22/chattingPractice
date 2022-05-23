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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStack';
import KeyboardAvoidingViews from '../components/KeyboradAvoidingViews';
import TestChattingMessage from '../components/TestChattingMessage';
import RegisterInput from '../components/RegisterInput';
import {Chatting} from '../types/chattingTypes';
import BottomSheet from '../components/BottomSheet';
import SearchAddress from '../components/SearchAddress';

type Props = NativeStackScreenProps<RootStackParamList, 'ChattingRoom'>;

export default function ChattingRoom({navigation, route}: Props) {
  const [isShowBottomSheet, setIsShowBottomShow] = useState<boolean>(false);
  const [message, setMessage] = useState<Chatting[]>([
    {
      id: 1,
      type: 'bot',
      nickname: '부루',
      contents:
        '안녕하세요. 부르미입니다. 서비스 이용을 위해 핸드폰번호를 입력해주세요.\n\n신규 회원이라면 가입 즉시 사용할 수 있는 3,000원 쿠폰을 드려요!',
      time: '12323',
    },
  ]);
  const chattingID = useRef<number>(0).current;

  const onSendMessage = async (contents: string): Promise<void | undefined> => {
    const data: Chatting = {
      id: 2,
      type: 'user',
      // nickname: '부루',
      contents: contents,
      time: '12323',
    };
    setMessage([...message, data]);
  };

  const onOpenAndCloseBottomSheet = (value: boolean): void | undefined => {
    setIsShowBottomShow(value);
  };

  const onSendAddress = (value: string | undefined) => {
    console.log('누름');
    const data: Chatting = {
      id: 3,
      type: 'user',
      // nickname: '부루',
      contents: value,
      time: '12323',
    };
    setMessage([...message, data]);
    setIsShowBottomShow(false);
  };
  return (
    <>
      <KeyboardAvoidingViews>
        <TestChattingMessage message={message} />
        <RegisterInput
          onSendMessage={onSendMessage}
          placeholder=""
          chattingType="ChattingWithOthers"
          onOpenBottomSheet={onOpenAndCloseBottomSheet}
        />
      </KeyboardAvoidingViews>
      <BottomSheet
        isShowBottomSheet={isShowBottomSheet}
        setIsShowBottomSheet={onOpenAndCloseBottomSheet}>
        <SearchAddress onSendAddress={value => onSendAddress(value)} />
      </BottomSheet>
    </>
  );
}
