/* eslint-disable react-native/no-inline-styles */
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
} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  Chatting,
  RequestProcess,
  RegisterProcess,
  ChattingType,
} from '../types/chattingTypes';
import useChattingRoomBottomMenuBar from '../hooks/useChattingRoomBottomMenuBar';

type Props = {
  message?: Chatting[];
  onPressEditPhoneNumber?: () => void;
  loading?: boolean;
  isShowDateTimePicker?: (event: GestureResponderEvent) => void | undefined;
  registerProcess?: RegisterProcess;
  requestProcess?: RequestProcess;
  onPressSearchAddress?: React.Dispatch<React.SetStateAction<boolean>> | any;
  onCompleteRequestingErrand?: () => void;
  chattingType: ChattingType;
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
  chattingType,
}: Props) {
  const chattingListRef = useRef<FlatList>(null);
  const [isKeyboardShow, setIsKeyboardShow] = useState<boolean>(false);
  const {isShowBottomMenuBar, onSwitchBottomMenuBar} =
    useChattingRoomBottomMenuBar();
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
            const lastMessage = message
              ? message[message.length - 1]
              : undefined;
            return (
              <>
                <Pressable
                  style={[
                    styles.senderChattingBox,
                    // lastMessage?.type === 'user' ? {marginTop: -18} : null,
                  ]}
                  key={item.id}>
                  <Text style={[styles.contents, {color: '#ffffff'}]}>
                    {item.contents}
                  </Text>
                </Pressable>
              </>
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
                      <Text style={styles.contents}>?????? ??? ?????? ??????</Text>
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
                      <Text style={styles.contents}>????????????</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.selectBox}
                      onPress={isShowDateTimePicker}
                      disabled={
                        requestProcess === 'selectDateAndTime' ? false : true
                      }>
                      <Text style={styles.contents}>????????????</Text>
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
                      ???????????? ?????????{'\n'}
                      <Text style={[styles.contents, {fontWeight: '700'}]}>
                        {item.address}
                      </Text>
                      ?????????.{'\n'}????????? ??????????????? ???????????? ??????????????????.
                    </Text>
                    <TouchableOpacity
                      style={styles.selectBox}
                      onPress={() => onPressSearchAddress(true)}
                      disabled={
                        registerProcess === 'setDetailAddress' ? false : true
                      }>
                      <Text style={styles.contents}>?????? ??????</Text>
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
                        {'\n??????\n'}
                        <Text
                          style={[
                            styles.contents,
                          ]}>{`?????? : ${item.requestDate}\n?????? : ${item.requestTime}`}</Text>
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
                        {'??????\n'}
                        <Text style={[styles.contents]}>
                          {item.requestContents}
                          <Text
                            style={{
                              fontSize: 11,
                              lineHeight: 15.93,
                              color: '#585858',
                              marginVertical: 14,
                            }}>{`\n\n?????? 1/15 (???) ${item.requestTime}??????\n???????????? ???????????? ????????? ???????????????.`}</Text>
                        </Text>
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.selectBox}
                      onPress={isShowDateTimePicker}>
                      <Text style={styles.contents}>????????????</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.selectBox}
                      onPress={onCompleteRequestingErrand}>
                      <Text style={styles.contents}>????????????</Text>
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
      message,
    ],
  );

  // const chattingMessage = useMemo(() => {
  //   return message?.map(item => {
  //     switch (item.type) {
  //       case 'bot':
  //         return (
  //           <View key={item.id}>
  //             {item.nickname === null ? null : (
  //               <View style={styles.recieverInfo}>
  //                 <Image
  //                   source={require('../../assets/images/botImage.png')}
  //                   style={styles.profileImage}
  //                 />
  //                 <Text style={styles.recieverNickname}>{item.nickname}</Text>
  //               </View>
  //             )}
  //             <View
  //               style={[
  //                 styles.recieverChattingContainer,
  //                 item.nickname === null ? {marginTop: -18} : null,
  //               ]}>
  //               <Pressable style={styles.recieverChattingBox}>
  //                 <Text style={styles.contents}>{item.contents}</Text>
  //               </Pressable>
  //             </View>
  //           </View>
  //         );
  //       case 'user':
  //         const lastMessage = message ? message[message.length - 1] : undefined;
  //         return (
  //           <Pressable
  //             style={[
  //               styles.senderChattingBox,
  //               // lastMessage?.type === 'user' ? {marginTop: -18} : null,
  //             ]}
  //             key={item.id}>
  //             <Text style={[styles.contents, {color: '#ffffff'}]}>
  //               {item.contents}
  //             </Text>
  //           </Pressable>
  //         );
  //       case 'button':
  //         return (
  //           <>
  //             {registerProcess === 'sendCertificationNumber' ? (
  //               <Pressable
  //                 style={styles.buttonTypeChatting}
  //                 onPress={onPressEditPhoneNumber}
  //                 key={item.id}>
  //                 <Text style={[styles.contents, {color: '#1754FC'}]}>
  //                   {item.contents}
  //                 </Text>
  //               </Pressable>
  //             ) : (
  //               <Pressable
  //                 style={styles.buttonTypeChatting}
  //                 onPress={() => onPressSearchAddress(true)}
  //                 key={item.id}>
  //                 <Text style={[styles.contents, {color: '#1754FC'}]}>
  //                   {item.contents}
  //                 </Text>
  //               </Pressable>
  //             )}
  //           </>
  //         );
  //       case 'datepicker':
  //         return (
  //           <>
  //             <View style={styles.recieverInfo} key={item.id}>
  //               <Image
  //                 source={require('../../assets/images/botImage.png')}
  //                 style={styles.profileImage}
  //               />
  //               <Text style={styles.recieverNickname}>{item.nickname}</Text>
  //             </View>
  //             <View style={styles.recieverChattingContainer}>
  //               <View style={styles.recieverChattingBox} key={item.id}>
  //                 <Text style={styles.contents}>{item.contents}</Text>
  //                 <TouchableOpacity
  //                   style={styles.selectBox}
  //                   onPress={isShowDateTimePicker}
  //                   disabled={
  //                     requestProcess === 'selectDateAndTime' ? false : true
  //                   }>
  //                   <Text style={styles.contents}>?????? ??? ?????? ??????</Text>
  //                 </TouchableOpacity>
  //               </View>
  //               <Text style={styles.timeline}>{item.time}</Text>
  //             </View>
  //           </>
  //         );
  //       case 'timepicker':
  //         return (
  //           <>
  //             <View style={styles.recieverInfo} key={item.id}>
  //               <Image
  //                 source={require('../../assets/images/botImage.png')}
  //                 style={styles.profileImage}
  //               />
  //               <Text style={styles.recieverNickname}>{item.nickname}</Text>
  //             </View>
  //             <View style={styles.recieverChattingContainer}>
  //               <View style={styles.recieverChattingBox} key={item.id}>
  //                 <Text style={styles.contents}>{item.contents}</Text>
  //                 <TouchableOpacity
  //                   style={styles.selectBox}
  //                   onPress={isShowDateTimePicker}
  //                   disabled={
  //                     requestProcess === 'selectDateAndTime' ? false : true
  //                   }>
  //                   <Text style={styles.contents}>????????????</Text>
  //                 </TouchableOpacity>
  //                 <TouchableOpacity
  //                   style={styles.selectBox}
  //                   onPress={isShowDateTimePicker}
  //                   disabled={
  //                     requestProcess === 'selectDateAndTime' ? false : true
  //                   }>
  //                   <Text style={styles.contents}>????????????</Text>
  //                 </TouchableOpacity>
  //               </View>
  //               <Text style={styles.timeline}>{item.time}</Text>
  //             </View>
  //           </>
  //         );
  //       case 'checkAddress':
  //         return (
  //           <>
  //             {item.nickname === null ? null : (
  //               <View style={styles.recieverInfo} key={item.id}>
  //                 <Image
  //                   source={require('../../assets/images/botImage.png')}
  //                   style={styles.profileImage}
  //                 />
  //                 <Text style={styles.recieverNickname}>{item.nickname}</Text>
  //               </View>
  //             )}
  //             <View
  //               style={[
  //                 styles.recieverChattingContainer,
  //                 item.nickname === null ? {marginTop: -18} : null,
  //               ]}>
  //               <Pressable style={styles.recieverChattingBox}>
  //                 <Text style={styles.contents}>
  //                   ???????????? ?????????{'\n'}
  //                   <Text style={[styles.contents, {fontWeight: '700'}]}>
  //                     {item.address}
  //                   </Text>
  //                   ?????????.{'\n'}????????? ??????????????? ???????????? ??????????????????.
  //                 </Text>
  //                 <TouchableOpacity
  //                   style={styles.selectBox}
  //                   onPress={() => onPressSearchAddress(true)}
  //                   disabled={
  //                     registerProcess === 'setDetailAddress' ? false : true
  //                   }>
  //                   <Text style={styles.contents}>?????? ??????</Text>
  //                 </TouchableOpacity>
  //               </Pressable>
  //             </View>
  //           </>
  //         );
  //       case 'checkErrend':
  //         return (
  //           <>
  //             {item.nickname === null ? null : (
  //               <View style={styles.recieverInfo} key={item.id}>
  //                 <Image
  //                   source={require('../../assets/images/botImage.png')}
  //                   style={styles.profileImage}
  //                 />
  //                 <Text style={styles.recieverNickname}>{item.nickname}</Text>
  //               </View>
  //             )}
  //             <View
  //               style={[
  //                 styles.recieverChattingContainer,
  //                 item.nickname === null ? {marginTop: -18} : null,
  //               ]}>
  //               <Pressable style={styles.recieverChattingBox}>
  //                 <View>
  //                   <Text style={styles.contents}>{item.contents}</Text>
  //                   <Text
  //                     style={[
  //                       styles.contents,
  //                       {
  //                         fontWeight: '700',
  //                         lineHeight: 18.82,
  //                       },
  //                     ]}>
  //                     {'\n??????\n'}
  //                     <Text
  //                       style={[
  //                         styles.contents,
  //                       ]}>{`?????? : ${item.requestDate}\n?????? : ${item.requestTime}`}</Text>
  //                   </Text>
  //                   <Text
  //                     style={[
  //                       styles.contents,
  //                       {
  //                         marginVertical: 10,
  //                         fontWeight: '700',
  //                         lineHeight: 18.82,
  //                       },
  //                     ]}>
  //                     {'??????\n'}
  //                     <Text style={[styles.contents]}>
  //                       {item.requestContents}
  //                       <Text
  //                         style={{
  //                           fontSize: 11,
  //                           lineHeight: 15.93,
  //                           color: '#585858',
  //                           marginVertical: 14,
  //                         }}>{`\n\n?????? 1/15 (???) ${item.requestTime}??????\n???????????? ???????????? ????????? ???????????????.`}</Text>
  //                     </Text>
  //                   </Text>
  //                 </View>
  //                 <TouchableOpacity
  //                   style={styles.selectBox}
  //                   onPress={isShowDateTimePicker}>
  //                   <Text style={styles.contents}>????????????</Text>
  //                 </TouchableOpacity>
  //                 <TouchableOpacity
  //                   style={styles.selectBox}
  //                   onPress={onCompleteRequestingErrand}>
  //                   <Text style={styles.contents}>????????????</Text>
  //                 </TouchableOpacity>
  //               </Pressable>
  //               <Text style={styles.timeline}>{item.time}</Text>
  //             </View>
  //           </>
  //         );
  //       default:
  //         return null;
  //     }
  //   });
  // }, [
  //   message,
  //   isShowDateTimePicker,
  //   onCompleteRequestingErrand,
  //   onPressEditPhoneNumber,
  //   onPressSearchAddress,
  //   registerProcess,
  //   requestProcess,
  // ]);
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
    <Pressable
      style={{flex: 1, width: '100%', zIndex: 10}}
      onPress={() => onSwitchBottomMenuBar(false)}
      disabled={
        chattingType === 'ChattingWithOthers' && isShowBottomMenuBar
          ? false
          : true
      }>
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
        style={{flex: 1, padding: 16, width: '100%'}}
      />
    </Pressable>
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
