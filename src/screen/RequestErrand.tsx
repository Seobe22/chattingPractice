import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {KeyboardTypeOptions, Platform} from 'react-native';
import RegisterInput from '../components/RegisterInput';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStack';
import TestChattingMessage from '../components/TestChattingMessage';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import IOSDatePicker from '../components/IOSDatePicker';
import KeyboardAvoidingViews from '../components/KeyboradAvoidingViews';
import Calendar from './Calendar';
import BottomSheet from '../components/BottomSheet';
import {Chatting, MessageType, RequestProcess} from '../types/chattingTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'RequestErrand'>;
export default function RequestErrand({navigation, route}: Props) {
  const [requestContents, setRequestContents] = useState<string>('');
  const times: number = Number(dayjs().format('HH:mm').split(':')[0]);
  const minitues: number = Number(dayjs().format('HH:mm').split(':')[1]);
  const [isShowBottomSheet, setIsShowBottomSheet] = useState<boolean>(false);
  const displayTime =
    times > 12
      ? `오후 ${times - 12}:${minitues < 10 ? '0' + minitues : minitues}`
      : `오전 ${times}:${minitues < 10 ? '0' + minitues : minitues}`;

  const [loading, setLoading] = useState<boolean>(false);
  const [isShowDateTimePicker, setIsShowDateTimePicker] =
    useState<boolean>(false);
  const [placeholder, setPlaceholder] =
    useState<string>('서비스 종류를 입력해주세요.');

  const [requestProcess, setRequestProcess] =
    useState<RequestProcess>('selectServiceType');

  const [keyboardType, setKeyboardType] = useState<
    KeyboardTypeOptions | undefined
  >('default');

  const onShowBottomSheet = () => {
    setIsShowBottomSheet(true);
  };

  const onHideBottomSheet = () => {
    setIsShowBottomSheet(false);
  };

  const [requestMessage, setRequestMessage] = useState<Chatting[]>([
    {
      id: 1,
      type: 'bot',
      nickname: '부루',
      contents: '어떤 서비스를 신청할까요?',
      time: displayTime,
    },
  ]);

  const onSendRequestMessage = async (contents: string) => {
    const messageData: Chatting = {
      id: requestMessage[requestMessage.length - 1].id + 1,
      contents: contents,
      type: 'user',
    };
    const times1: number = Number(dayjs().format('HH:mm').split(':')[0]);
    const minitues1: number = Number(dayjs().format('HH:mm').split(':')[1]);
    const displayTime1 =
      times > 12
        ? `오후 ${times1 - 12}:${minitues1 < 10 ? '0' + minitues1 : minitues1}`
        : `오전 ${times1}:${minitues1 < 10 ? '0' + minitues1 : minitues1}`;
    const botMessage: Chatting = {
      id: requestMessage[requestMessage.length - 1].id + 2,
      type: 'bot',
      nickname: '부루',
      contents: '서비스 내용을 입력해주세요.',
      time: displayTime1,
    };
    if (requestProcess === 'selectServiceType') {
      setPlaceholder('서비스 내용을 입력해주세요');
      setRequestMessage([...requestMessage, messageData]);
      setTimeout(() => {
        setRequestMessage([...requestMessage, messageData, botMessage]);
      }, 500);
      setRequestProcess('selectServiceContents');
    } else if (requestProcess === 'selectServiceContents') {
      const serviceContentsBotMessage: Chatting = {
        id: requestMessage[requestMessage.length - 1].id + 4,
        contents: '서비스 날짜와 시간을 선택해주세요.',
        type: 'datepicker',
        nickname: '부루',
        time: displayTime1,
      };
      setPlaceholder('서비스 날짜와 시간을 선택해주세요.');
      setRequestContents(contents);
      setRequestMessage([...requestMessage, messageData]);
      setTimeout(() => {
        setRequestMessage([
          ...requestMessage,
          messageData,
          serviceContentsBotMessage,
        ]);
      }, 500);
      setRequestProcess('selectDateAndTime');
    }
  };

  const onSelectDateAndTime = async (
    date: string,
    time: string,
    displayDate: string,
    displayTimes: string,
  ) => {
    const requestCheckMessage: Chatting = {
      id: requestMessage[requestMessage.length - 1].id + 2,
      nickname: null,
      type: 'checkErrend',
      contents: '심부름 일정과 내용을 확인해주세요.',
      requestDate: displayDate,
      requestTime: displayTimes,
      requestContents: requestContents,
    };
    setRequestMessage([...requestMessage, requestCheckMessage]);
    setPlaceholder('심부름 일정과 내용을 확인해주세요.');
    onHideBottomSheet();
    setRequestProcess('requestComplete');
  };

  const onCompleteRequestingErrand = () => {
    const requestCheckMessage: Chatting = {
      id: requestMessage[requestMessage.length - 1].id + 1,
      nickname: null,
      type: 'bot',
      contents: '주문이 완료되었습니다. 헬퍼와의 채팅방을 만들어드릴게요.',
    };

    setLoading(true);
    setTimeout(() => {
      setRequestMessage([...requestMessage, requestCheckMessage]);
      setLoading(false);
    }, 1500);
  };

  return (
    <KeyboardAvoidingViews>
      <TestChattingMessage
        requestProcess={requestProcess}
        loading={loading}
        message={requestMessage}
        isShowDateTimePicker={onShowBottomSheet}
        onCompleteRequestingErrand={onCompleteRequestingErrand}
      />
      <BottomSheet
        isShowBottomSheet={isShowBottomSheet}
        setIsShowBottomSheet={setIsShowBottomSheet}>
        <Calendar
          isModalOpen={isShowDateTimePicker}
          setIsModalOpen={setIsShowDateTimePicker}
          onHideBottomSheet={onHideBottomSheet}
          onSelectDateAndTime={onSelectDateAndTime}
        />
      </BottomSheet>
      <RegisterInput
        onSendMessage={onSendRequestMessage}
        keyboardType={keyboardType}
        placeholder={placeholder}
        requestProcess={requestProcess}
      />
    </KeyboardAvoidingViews>
  );
}
