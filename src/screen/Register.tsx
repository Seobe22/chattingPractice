import dayjs from 'dayjs';
import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardTypeOptions, View, TextInput, StatusBar} from 'react-native';
import RegisterInput from '../components/RegisterInput';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStack';
import TestChattingMessage from '../components/TestChattingMessage';
import KeyboardAvoidingViews from '../components/KeyboradAvoidingViews';
import {Chatting, RegisterProcess} from '../types/chattingTypes';
import BottomSheet from '../components/BottomSheet';
import SearchAddress from '../components/SearchAddress';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function Register({navigation, route}: Props) {
  const times: number = Number(dayjs().format('HH:mm').split(':')[0]);
  const minitues: number = Number(dayjs().format('HH:mm').split(':')[1]);
  const androidStatusBarHeight = StatusBar.currentHeight as number;
  const displayTime =
    times > 12
      ? `오후 ${times - 12}:${minitues < 10 ? '0' + minitues : minitues}`
      : `오전 ${times}:${minitues < 10 ? '0' + minitues : minitues}`;

  const [loading, setLoading] = useState<boolean>(false);

  const [placeholder, setPlaceholder] =
    useState<string>('핸드폰번호를 입력해주세요.');
  const [registerProcess, setRegisterProcess] =
    useState<RegisterProcess>('sendPhoneNumber');
  const [isShowBottomSheet, setIsShowBottomSheet] = useState<boolean>(false);
  const [keyboardType, setKeyboardType] = useState<
    KeyboardTypeOptions | undefined
  >('number-pad');

  const [message, setMessage] = useState<Chatting[]>([
    {
      id: 1,
      type: 'bot',
      nickname: '부루',
      contents:
        '안녕하세요. 부르미입니다. 서비스 이용을 위해 핸드폰번호를 입력해주세요.\n\n신규 회원이라면 가입 즉시 사용할 수 있는 3,000원 쿠폰을 드려요!',
      time: displayTime,
    },
  ]);

  const onSendMessage = async (contents: string) => {
    const messageData: Chatting = {
      id: message[message.length - 1].id + 1,
      contents: contents,
      type: 'user',
    };
    const certificationMessage: Chatting = {
      id: message[message.length - 1].id + 2,
      type: 'bot',
      nickname: '부루',
      contents: '문자로 인증번호를 보냈습니다.\n4자리 숫자를 입력해주세요.',
      time: displayTime,
    };
    const editPhoneNumberButton: Chatting = {
      id: message[message.length - 1].id + 3,
      type: 'button',
      contents: '전화번호 재입력',
    };
    if (registerProcess === 'sendPhoneNumber') {
      await setMessage([...message, messageData]);
      await setPlaceholder('인증번호 전송중입니다.');
      await setLoading(true);
      await setTimeout(() => {
        setLoading(false);
        setMessage([...message, messageData, certificationMessage]);
        setPlaceholder('인증번호를 입력해주세요.');
        setMessage([
          ...message,
          messageData,
          certificationMessage,
          editPhoneNumberButton,
        ]);
      }, 2500);
      setRegisterProcess('sendCertificationNumber');
    } else if (registerProcess === 'sendCertificationNumber') {
      message.pop();
      await setPlaceholder('인증번호 확인중입니다.');
      setMessage([...message, messageData]);
      const completeCertificationMessage: Chatting = {
        ...certificationMessage,
        contents: '인증이 완료되었어요! 회원가입을 진행할게요!',
      };
      const requestAddressMessage: Chatting = {
        ...certificationMessage,
        id: message[message.length - 1].id + 5,
        contents: '심부름을 요청하실 주소를 알려주시겠어요?',
        nickname: null,
      };
      const searchAddressMessageButton: Chatting = {
        id: message[message.length - 1].id + 6,
        type: 'button',
        contents: '주소 검색하기',
      };
      setLoading(true);
      await setTimeout(() => {
        setLoading(false);
        setMessage([
          ...message,
          messageData,
          completeCertificationMessage,
          requestAddressMessage,
          searchAddressMessageButton,
        ]);
        setPlaceholder('화면의 주소 검색하기를 눌러주세요!');
        setRegisterProcess('searchAddress');
        setKeyboardType('default');
      }, 2000);
    } else if (registerProcess === 'setDetailAddress') {
      const sendDetailAddress: Chatting = await {
        id: message[message.length - 1].id + 1,
        type: 'user',
        contents: contents,
      };
      const sendSetNickname: Chatting = await {
        id: message[message.length - 1].id + 2,
        type: 'bot',
        nickname: '부루',
        contents:
          '주소등록이 완료되었습니다.\n마지막으로 닉네임을 설정해주세요.',
      };
      setMessage([...message, sendDetailAddress]);
      setLoading(true);
      await setTimeout(() => {
        setLoading(false);
        setMessage([...message, sendDetailAddress, sendSetNickname]);
        setPlaceholder('사용하실 닉네임을 설정해주세요.');
        setRegisterProcess('setNickname');
      }, 2000);
    } else if (registerProcess === 'setNickname') {
      const sendNickname: Chatting = {
        id: message[message.length - 1].id + 1,
        type: 'user',
        contents: contents,
      };
      const certificateUsersNickname: Chatting = {
        id: message[message.length - 1].id + 2,
        type: 'bot',
        contents: '닉네임 설정이 완료되었습니다.',
        nickname: '부루',
      };
      setMessage([...message, sendNickname]);
      setLoading(true);
      await setTimeout(() => {
        setLoading(false);
        setMessage([...message, sendNickname, certificateUsersNickname]);
        setPlaceholder('사용하실 닉네임을 설정해주세요.');
      }, 2000);
    }
  };

  const onSendAddress = useCallback(
    async (value: string | undefined) => {
      message.pop();
      const checkAddressMessage: Chatting = await {
        id: message[message.length - 1].id + 2,
        type: 'checkAddress',
        nickname: '부루',
        address: value as string,
      };
      const sendAddress: Chatting = await {
        id: message[message.length - 1].id + 1,
        type: 'user',
        contents: value as string,
      };
      await setMessage([...message, sendAddress]);
      await setIsShowBottomSheet(false);

      await setLoading(true);
      await setTimeout(() => {
        setLoading(false);
        setMessage([...message, sendAddress, checkAddressMessage]);
      }, 1500);
      setRegisterProcess('setDetailAddress');
      setPlaceholder('상세주소를 입력해주세요.');
    },
    [message],
  );

  const onPressEditPhoneNumber = () => {
    const certificationMessage: Chatting = {
      id: message[message.length - 1].id + 2,
      type: 'bot',
      nickname: '부루',
      contents: '전화번호를 다시 입력해주세요.',
      time: displayTime,
    };
    setRegisterProcess('sendPhoneNumber');
    setPlaceholder('휴대폰번호를 입력해주세요.');
    setMessage([...message, certificationMessage]);
  };
  return (
    <>
      {isShowBottomSheet ? (
        <View style={{flex: 1, backgroundColor: 'rgba(23, 84, 252, 0.1)'}}>
          <TestChattingMessage
            loading={loading}
            message={message}
            onPressEditPhoneNumber={onPressEditPhoneNumber}
            onPressSearchAddress={setIsShowBottomSheet}
            registerProcess={registerProcess}
          />
          <RegisterInput
            onSendMessage={onSendMessage}
            keyboardType={keyboardType}
            placeholder={placeholder}
            loading={loading}
            registerProcess={registerProcess}
          />
        </View>
      ) : (
        <KeyboardAvoidingViews>
          <TestChattingMessage
            loading={loading}
            message={message}
            onPressEditPhoneNumber={onPressEditPhoneNumber}
            onPressSearchAddress={setIsShowBottomSheet}
            registerProcess={registerProcess}
          />
          <RegisterInput
            onSendMessage={onSendMessage}
            keyboardType={keyboardType}
            placeholder={placeholder}
            loading={loading}
            registerProcess={registerProcess}
          />
        </KeyboardAvoidingViews>
      )}

      <BottomSheet
        isShowBottomSheet={isShowBottomSheet}
        androidStatusBarHeight={androidStatusBarHeight}
        setIsShowBottomSheet={setIsShowBottomSheet}>
        <SearchAddress onSendAddress={onSendAddress} />
      </BottomSheet>
    </>
  );
}
