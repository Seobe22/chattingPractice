/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
  Keyboard,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useInput from '../hooks/useInput';
import {RegisterProcess, RequestProcess} from '../types/chattingTypes';

interface Props {
  onSendMessage: (contents: string) => void;
  keyboardType?: KeyboardTypeOptions | undefined;
  placeholder: string;
  loading?: boolean;
  registerProcess?: RegisterProcess;
  requestProcess?: RequestProcess;
}

export default function RegisterInput({
  onSendMessage,
  keyboardType,
  placeholder,
  loading,
  registerProcess,
  requestProcess,
}: Props) {
  const {bottom} = useSafeAreaInsets();
  const screenHeight = Dimensions.get('screen').height;
  const [textInpuHeight, setTextInputHeight] = useState<number>(0);
  const [isShowKeyboard, setIsShowKeyboard] = useState<boolean>(false);
  const panY = useRef<Animated.Value>(new Animated.Value(bottom + 60)).current;
  const [enable, setEnable] = useState<boolean>(false);
  const contents = useInput();
  const onPress = () => {
    contents.onChangeText('');
    onSendMessage(contents.value);
  };
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });
  const inputEditable = () => {
    if (!loading && registerProcess !== 'searchAddress') {
      return true;
    } else if (loading && registerProcess !== 'searchAddress') {
      return false;
    } else if (!loading && registerProcess === 'searchAddress') {
      return false;
    } else if (loading && registerProcess === 'searchAddress') {
      return false;
    }
  };

  const onContentSizeChage = useCallback(
    (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
      const currentHeight = e.nativeEvent.contentSize.height;
      setTextInputHeight(currentHeight);
    },
    [],
  );

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => setIsShowKeyboard(true),
    );
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => setIsShowKeyboard(false),
    );
    return () => {
      keyboardWillShowListener?.remove();
      keyboardWillHideListener?.remove();
    };
  }, [isShowKeyboard]);

  useEffect(() => {
    Animated.timing(panY, {
      toValue: enable ? 149 : 0,
      // duration: 300,
      useNativeDriver: true,
    }).start();

    // console.log(panY);
  }, [enable, panY, bottom]);
  console.log(bottom + 60);
  return (
    <Animated.View
      style={{
        transform: [{translateY: panY}],
        height: 250,
        backgroundColor: '#333333',
      }}>
      <View
        style={[
          styles.box,
          {
            // transform: [{translateY: panY}],
            height: 'auto',
            ...Platform.select({
              ios: {
                paddingBottom: isShowKeyboard ? bottom + 8 : bottom,
                minHeight: 60 + bottom,
                alignItems:
                  textInpuHeight > 60 + bottom ? 'flex-end' : 'center',
              },
              android: {
                minHeight: 60,
                alignItems: textInpuHeight > 60 ? 'flex-end' : 'center',
              },
            }),
          },
        ]}>
        <TouchableOpacity onPress={() => setEnable(!enable)}>
          <Image
            source={require('../../assets/images/chattingOtherButton.png')}
            style={styles.otherMenuButton}
          />
        </TouchableOpacity>
        <TextInput
          autoComplete="off"
          // eslint-disable-next-line no-sparse-arrays
          style={[
            styles.input,
            {
              minHeight: 29,
              height: Math.max(29, textInpuHeight),
              maxHeight: bottom + 120,
            },
            ,
          ]}
          numberOfLines={5}
          multiline={true}
          value={contents.value}
          onChangeText={contents.onChangeText}
          textAlignVertical="center"
          keyboardType={keyboardType}
          placeholder={placeholder}
          editable={!loading}
          onContentSizeChange={onContentSizeChage}
          placeholderTextColor="#9a99a1"
        />
        <TouchableOpacity
          onPress={onPress}
          style={styles.buttonContainer}
          disabled={
            loading ||
            registerProcess === 'searchAddress' ||
            requestProcess === 'requestComplete' ||
            requestProcess === 'selectDateAndTime' ||
            contents.value.trim() === ''
              ? true
              : false
          }>
          <Image
            source={
              loading ||
              registerProcess === 'searchAddress' ||
              requestProcess === 'requestComplete' ||
              requestProcess === 'selectDateAndTime'
                ? require('../../assets/images/disableSenderIcon.png')
                : require('../../assets/images/senderIcon.png')
            }
            style={styles.sendButton}
          />
        </TouchableOpacity>
      </View>
      {/* <Animated.View
        style={{
          ...styles.otherMenuContainer,
          transform: [{translateY: panY}],
          height: enable ? 0 : 149,
        }}></Animated.View> */}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  box: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ffffff',
    // right: 0,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  input: {
    width: '80%',
    borderRadius: 10,
    fontSize: 13,
    flexShrink: 1,
    justifyContent: 'center',
    fontWeight: '700',
    color: '#333333',
    alignItems: 'center',
    padding: 0,
  },
  sendButton: {
    width: 29,
    height: 29,
  },
  selectPhotoButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    width: 25,
    backgroundColor: 'rgba(169, 148, 199, 0.1)',
    borderRadius: 10,
  },
  buttonContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectPhotoIcon: {
    fontSize: 16,
  },
  disableButton: {
    tintColor: '#e3e3e3',
  },
  otherMenuButton: {
    width: 29,
    height: 29,
    marginRight: 16,
  },
  otherMenuContainer: {width: '100%', height: 100, backgroundColor: '#333333'},
});
