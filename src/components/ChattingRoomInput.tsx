import React, {useCallback, useState} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInputContentSizeChangeEventData,
  NativeSyntheticEvent,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  onPress: (data: string) => void;
}

export default function ChattingRoomInput({onPress}: Props) {
  const {bottom} = useSafeAreaInsets();
  const [contents, setContents] = useState<string>('');
  const [inputHeights, setInputHeight] = useState<number>(0);
  const [lines, setLines] = useState(0);
  const onSubmitEditing = () => {
    onPress(contents);
    setContents('');
  };
  const onContentSizeChange = useCallback(
    (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
      console.log(lines, inputHeights);
      const height = Math.round(e.nativeEvent.contentSize.height);
      if (lines > 4) {
        return;
      } else if (inputHeights < height) {
        setInputHeight(inputHeights + 20);
        setLines(lines + 1);
      } else if (height < inputHeights) {
        setInputHeight(inputHeights - 20);
        setLines(lines - 1);
      }
    },
    [inputHeights, lines],
  );
  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          height: lines === 0 || lines === 1 ? bottom + 44 : 10 + 20 * lines,
        },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 130 : 0}>
      <View style={styles.box}>
        <TextInput
          style={[
            styles.input,
            {height: lines === 0 || lines === 1 ? 35 : 20 * lines},
          ]}
          multiline={true}
          value={contents}
          onChangeText={e => setContents(e)}
          onContentSizeChange={onContentSizeChange}
          textAlignVertical="center"
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={onSubmitEditing}
          disabled={contents.trim() === '' ? true : false}>
          <Text>전송</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9c89b8',
    paddingVertical: 4,
  },
  box: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 40,
    maxHeight: 'auto',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    height: 35,
    borderRadius: 15,
    paddingHorizontal: 16,
    backgroundColor: '#a994c7',
    fontSize: 14,
    flexShrink: 1,
    paddingVertical: 0,
  },
  sendButton: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 1,
  },
});
