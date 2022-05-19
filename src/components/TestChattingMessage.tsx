import dayjs from 'dayjs';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  ListRenderItem,
  Keyboard,
  TouchableOpacity,
  GestureResponderEvent,
  ScrollView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  Chatting,
  RequestProcess,
  RegisterProcess,
} from '../types/chattingTypes';

type Props = {
  message: Chatting[];
  onPressEditPhoneNumber?: () => void;
  loading: boolean;
  isShowDateTimePicker?: (event: GestureResponderEvent) => void | undefined;
  registerProcess?: RegisterProcess;
  requestProcess?: RequestProcess;
  onPressSearchAddress?: React.Dispatch<React.SetStateAction<boolean>> | any;
  onCompleteRequestingErrand?: () => void;
};
export default function TestChattingMessage({
  message,
  onPressEditPhoneNumber,
  loading,
  isShowDateTimePicker,
  requestProcess,
  registerProcess,
  onPressSearchAddress,
  onCompleteRequestingErrand,
}: Props) {
  const chattingListRef = useRef<FlatList>(null);
  const [isKeyboardShow, setIsKeyboardShow] = useState<boolean>(false);

  const renderItem: ListRenderItem<Chatting> = useMemo(
    () =>
      ({item}) => {
        switch (item.type) {
          case 'bot':
            return (
              <>
                {item.nickname === null ? null : (
                  <View style={styles.recieverInfo} key={item.id}>
                    <Image
                      source={require('../../assets/images/botImage.png')}
                      style={styles.profileImage}
                    />
                    <Text style={styles.recieverNickname}>{item.nickname}</Text>
                  </View>
                )}
                <View
                  style={[
                    styles.recieverChattingContainer,
                    item.nickname === null ? {marginTop: -18} : null,
                  ]}>
                  <Pressable style={styles.recieverChattingBox}>
                    <Text style={styles.contents}>{item.contents}</Text>
                  </Pressable>
                </View>
              </>
            );
          case 'user':
            return (
              <Pressable style={styles.senderChattingBox} key={item.id}>
                <Text style={[styles.contents, {color: '#ffffff'}]}>
                  {item.contents}
                </Text>
              </Pressable>
            );
          case 'button':
            return (
              <>
                {registerProcess === 'sendCertificationNumber' ? (
                  <Pressable
                    style={styles.buttonTypeChatting}
                    onPress={onPressEditPhoneNumber}
                    key={item.id}>
                    <Text style={[styles.contents, {color: '#1754FC'}]}>
                      {item.contents}
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={styles.buttonTypeChatting}
                    onPress={() => onPressSearchAddress(true)}
                    key={item.id}>
                    <Text style={[styles.contents, {color: '#1754FC'}]}>
                      {item.contents}
                    </Text>
                  </Pressable>
                )}
              </>
            );
          case 'datepicker':
            return (
              <>
                <View style={styles.recieverInfo} key={item.id}>
                  <Image
                    source={require('../../assets/images/botImage.png')}
                    style={styles.profileImage}
                  />
                  <Text style={styles.recieverNickname}>{item.nickname}</Text>
                </View>
                <View style={styles.recieverChattingContainer}>
                  <View style={styles.recieverChattingBox} key={item.id}>
                    <Text style={styles.contents}>{item.contents}</Text>
                    <TouchableOpacity
                      style={styles.selectBox}
                      onPress={isShowDateTimePicker}
                      disabled={
                        requestProcess === 'selectDateAndTime' ? false : true
                      }>
                      <Text style={styles.contents}>날짜 및 시간 선택</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.timeline}>{item.time}</Text>
                </View>
              </>
            );
          case 'timepicker':
            return (
              <>
                <View style={styles.recieverInfo} key={item.id}>
                  <Image
                    source={require('../../assets/images/botImage.png')}
                    style={styles.profileImage}
                  />
                  <Text style={styles.recieverNickname}>{item.nickname}</Text>
                </View>
                <View style={styles.recieverChattingContainer}>
                  <View style={styles.recieverChattingBox} key={item.id}>
                    <Text style={styles.contents}>{item.contents}</Text>
                    <TouchableOpacity
                      style={styles.selectBox}
                      onPress={isShowDateTimePicker}
                      disabled={
                        requestProcess === 'selectDateAndTime' ? false : true
                      }>
                      <Text style={styles.contents}>시간선택</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.selectBox}
                      onPress={isShowDateTimePicker}
                      disabled={
                        requestProcess === 'selectDateAndTime' ? false : true
                      }>
                      <Text style={styles.contents}>날짜변경</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.timeline}>{item.time}</Text>
                </View>
              </>
            );
          case 'checkAddress':
            return (
              <>
                {item.nickname === null ? null : (
                  <View style={styles.recieverInfo} key={item.id}>
                    <Image
                      source={require('../../assets/images/botImage.png')}
                      style={styles.profileImage}
                    />
                    <Text style={styles.recieverNickname}>{item.nickname}</Text>
                  </View>
                )}
                <View
                  style={[
                    styles.recieverChattingContainer,
                    item.nickname === null ? {marginTop: -18} : null,
                  ]}>
                  <Pressable style={styles.recieverChattingBox}>
                    <Text style={styles.contents}>
                      선택하신 주소는{'\n'}
                      <Text style={[styles.contents, {fontWeight: '700'}]}>
                        {item.address}
                      </Text>
                      입니다.{'\n'}나머지 상세주소를 정확하게 입력해주세요.
                    </Text>
                    <TouchableOpacity
                      style={styles.selectBox}
                      onPress={() => onPressSearchAddress(true)}
                      disabled={
                        registerProcess === 'setDetailAddress' ? false : true
                      }>
                      <Text style={styles.contents}>주소 변경</Text>
                    </TouchableOpacity>
                  </Pressable>
                </View>
              </>
            );
          case 'checkErrend':
            return (
              <>
                {item.nickname === null ? null : (
                  <View style={styles.recieverInfo} key={item.id}>
                    <Image
                      source={require('../../assets/images/botImage.png')}
                      style={styles.profileImage}
                    />
                    <Text style={styles.recieverNickname}>{item.nickname}</Text>
                  </View>
                )}
                <View
                  style={[
                    styles.recieverChattingContainer,
                    item.nickname === null ? {marginTop: -18} : null,
                  ]}>
                  <Pressable style={styles.recieverChattingBox}>
                    <View>
                      <Text style={styles.contents}>{item.contents}</Text>
                      <Text
                        style={[
                          styles.contents,
                          {
                            fontWeight: '700',
                            lineHeight: 18.82,
                          },
                        ]}>
                        {'\n일정\n'}
                        <Text
                          style={[
                            styles.contents,
                          ]}>{`날짜 : ${item.requestDate}\n시간 : ${item.requestTime}`}</Text>
                      </Text>
                      <Text
                        style={[
                          styles.contents,
                          {
                            marginVertical: 10,
                            fontWeight: '700',
                            lineHeight: 18.82,
                          },
                        ]}>
                        {'내용\n'}
                        <Text style={[styles.contents]}>
                          {item.requestContents}
                          <Text
                            style={{
                              fontSize: 11,
                              lineHeight: 15.93,
                              color: '#585858',
                              marginVertical: 14,
                            }}>{`\n\n오늘 1/15 (화) ${item.requestTime}까지\n요청하신 심부름이 완료될 예정입니다.`}</Text>
                        </Text>
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.selectBox}
                      onPress={isShowDateTimePicker}>
                      <Text style={styles.contents}>일정변경</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.selectBox}
                      onPress={onCompleteRequestingErrand}>
                      <Text style={styles.contents}>주문하기</Text>
                    </TouchableOpacity>
                  </Pressable>
                  <Text style={styles.timeline}>{item.time}</Text>
                </View>
              </>
            );
          default:
            return null;
        }
      },
    [
      isShowDateTimePicker,
      onCompleteRequestingErrand,
      onPressEditPhoneNumber,
      onPressSearchAddress,
      registerProcess,
      requestProcess,
      // message,
    ],
  );
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardShow(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardShow(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  });

  useEffect(() => {
    setTimeout(() => {
      return chattingListRef.current?.scrollToEnd({
        animated: false,
      });
    }, 100);
  }, [isKeyboardShow]);

  const loadingChatting = () => {
    if (loading) {
      return (
        <View style={[styles.recieverChattingBox, {marginBottom: 28}]}>
          <LottieView
            style={styles.loadingChat}
            source={require('../../assets/images/loading.json')}
            autoPlay
            loop
          />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <FlatList
      ref={chattingListRef}
      data={message}
      renderItem={renderItem}
      keyExtractor={(item: Chatting) => `chatId-${item.id}`}
      ListFooterComponent={loadingChatting}
      onContentSizeChange={() =>
        chattingListRef.current?.scrollToEnd({
          animated: false,
        })
      }
      style={{padding: 16}}
      // automaticallyAdjustKeyboardInsets={true}
    />
    // <ScrollView contentContainerStyle={styles.container} scrollEnabled={true}>
    //   {renderItem}
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgba(23, 84, 252, 0.1)',
    flex: 1,
    width: '100%',
    padding: 16,
  },
  recieverChattingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 28,
  },
  recieverChattingBox: {
    padding: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: 'auto',
    maxWidth: '77%',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  senderChattingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  senderChattingBox: {
    padding: 10,
    backgroundColor: '#1754FC',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: 'auto',
    maxWidth: '77%',
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginBottom: 28,
    borderBottomRightRadius: 0,
  },
  contents: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18.82,
    color: '#333333',
  },
  timeline: {
    fontSize: 10,
    color: '#9a99a1',
    marginLeft: 10,
    letterSpacing: 0.03,
    lineHeight: 14.48,
    fontWeight: '400',
  },
  profileImage: {
    width: 32,
    height: 32,
  },
  recieverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  recieverNickname: {
    fontSize: 14,
    lineHeight: 20.27,
    fontWeight: '500',
    color: '#333333',
    marginLeft: 6,
  },
  loadingChat: {
    width: 60,
    height: 20,
  },
  buttonTypeChatting: {
    backgroundColor: '#ffffff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: 'auto',
    maxWidth: '77%',
    borderRadius: 10,
    marginBottom: 28,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
    borderColor: '#1754FC',
    borderWidth: 1,
  },
  selectBox: {
    backgroundColor: '#f1f2f4',
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
});
