import React, {useEffect, useRef, useState} from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ListRenderItem,
  FlatList,
  Keyboard,
} from 'react-native';
import {Chatting} from '../screen/ChattingRoom';

interface Props {
  data: Chatting[];
}

export default function SpeechBallonsInChattinRoom({data}: Props) {
  const flatListRef = useRef<FlatList>(null);
  const [, setKeyboardStatus] = useState<boolean>(false);
  const renderItem: ListRenderItem<Chatting> = ({item}) => {
    return (
      <Pressable
        style={
          item.senderNickname === '이명섭'
            ? styles.senderContainer
            : styles.receiverContainer
        }
        key={item.chatId}>
        <Text style={styles.comment}>{item.contents}</Text>
      </Pressable>
    );
  };

  const onScrollToEnd = () => {
    flatListRef.current?.scrollToEnd({
      animated: true,
    });
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={renderItem}
      onContentSizeChange={onScrollToEnd}
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
  comment: {},
});
