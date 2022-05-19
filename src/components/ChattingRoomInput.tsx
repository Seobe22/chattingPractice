import React, {useCallback, useEffect, useState} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
  ViewStyle,
  TextInputContentSizeChangeEventData,
  NativeSyntheticEvent,
  Platform,
} from 'react-native';
import {ImagePickerResponse} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  onPress: (data: string) => void;
  onSelectPhoto?: () => Promise<ImagePickerResponse>;
}

export default function ChattingRoomInput({onPress, onSelectPhoto}: Props) {
  const {bottom} = useSafeAreaInsets();
  const [contents, setContents] = useState<string>('');
  const [inputHeights, setInputHeight] = useState<number>(0);
  const [lines, setLines] = useState(1);
  const [position, setPosition] = useState('absolute');

  const onSubmitEditing = () => {
    onPress(contents);
    setContents('');
    setLines(1);
    setInputHeight(0);
  };

  const onContentSizeChange = useCallback(
    (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
      if (lines === 1) {
        if (Math.round(e.nativeEvent.contentSize.height) > 15) {
          setInputHeight(Math.round(e.nativeEvent.contentSize.height));
          setLines(lines + 1);
        } else {
          setLines(1);
        }
      } else {
        const newInputHeight = Math.round(e.nativeEvent.contentSize.height);
        if (inputHeights > newInputHeight) {
          setLines(lines - 1);
          setInputHeight(Math.round(e.nativeEvent.contentSize.height));
        } else if (inputHeights < newInputHeight && lines < 5) {
          setLines(lines + 1);
          setInputHeight(Math.round(e.nativeEvent.contentSize.height));
        }
      }
    },
    [inputHeights, lines],
  );

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => setPosition('relative'),
    );
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => setPosition('absolute'),
    );
    return () => {
      keyboardWillShowListener?.remove();
      keyboardWillHideListener?.remove();
    };
  }, [position]);

  return (
    <View
      style={
        [
          styles.box,
          {
            ...Platform.select({
              android: {
                height: 'auto',
              },
              ios: {
                height: position === 'relative' ? 'auto' : 44 + bottom,
                alignItems: position === 'relative' ? 'flex-end' : 'flex-start',
              },
            }),
            position: position,
          },
        ] as ViewStyle
      }>
      <TouchableOpacity
        style={styles.selectPhotoButton}
        onPress={onSelectPhoto}>
        <Text style={styles.selectPhotoIcon}>+</Text>
      </TouchableOpacity>
      <TextInput
        style={[
          styles.input,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            height: lines === 1 ? 36 : 'auto',
            minHeight: 36,
            maxHeight: 106,
          },
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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingVertical: 4,
  },
  box: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    minHeight: 44,
    paddingVertical: 4,
    maxHeight: 'auto',
    backgroundColor: '#ffffff',
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    width: '80%',
    height: 36,
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(169, 148, 199, 0.1)',
    fontSize: 16,
    flexShrink: 1,
    paddingVertical: 4,
  },
  sendButton: {
    paddingHorizontal: 8,
    borderRadius: 10,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(169, 148, 199, 0.1)',
  },
  selectPhotoButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    width: 25,
    backgroundColor: 'rgba(169, 148, 199, 0.1)',
    borderRadius: 10,
  },
  selectPhotoIcon: {
    fontSize: 16,
  },
});
