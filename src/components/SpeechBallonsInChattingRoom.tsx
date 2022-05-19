import React, {useEffect, useRef, useState} from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ListRenderItem,
  FlatList,
  Keyboard,
  Platform,
  ViewStyle,
} from 'react-native';
import {Chatting} from '../screen/ChattingRoom';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  data: Chatting[];
}

export default function SpeechBallonsInChattinRoom({data}: Props) {
  const {bottom} = useSafeAreaInsets();
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);

  const iosChattingMessageStyle: ViewStyle = {
    marginBottom: keyboardStatus ? 0 : 44 + bottom,
  };

  const onScrollToEndWithAnimation = () => {
    flatListRef.current?.scrollToEnd({
      animated: true,
    });
  };

  const onScrollToEndWithoutAnimation = () => {
    flatListRef.current?.scrollToEnd({
      animated: false,
    });
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
      onScrollToEndWithoutAnimation();
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const renderItem: ListRenderItem<Chatting> = ({item}) => {
    return (
      <Pressable
        style={
          item.senderNickname === '이명섭'
            ? styles.senderContainer
            : styles.receiverContainer
        }
        key={item.chatId}
        onPress={() => console.log(item.chatId)}>
        <Text style={styles.comment}>{item.contents}</Text>
      </Pressable>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={renderItem}
      onContentSizeChange={onScrollToEndWithAnimation}
      ListFooterComponent={() => {
        return (
          <View
            style={
              Platform.OS === 'android'
                ? styles.androidChatMargin
                : iosChattingMessageStyle
            }
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  senderContainer: {
    marginHorizontal: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#efc3e6',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    maxWidth: '100%',
    width: 'auto',
    alignSelf: 'flex-end',
    marginVertical: 8,
  },
  receiverContainer: {
    marginHorizontal: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0e6ef',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    maxWidth: '100%',
    width: 'auto',
    alignSelf: 'flex-start',
    marginVertical: 8,
  },
  comment: {
    fontSize: 16,
  },
  androidChatMargin: {
    marginBottom: 48,
  },
});
