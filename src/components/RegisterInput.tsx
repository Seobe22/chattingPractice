/* eslint-disable react/self-closing-comp */
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
  Platform,
  Animated,
  Dimensions,
  ImageSourcePropType,
  ListRenderItemInfo,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useCameraAndImagePicker from '../hooks/useCameraAndImagePicker';
import useInput from '../hooks/useInput';
import useKeyboard from '../hooks/useKeyboard';
import Font from '../shared/Font';
import {
  ChattingType,
  RegisterProcess,
  RequestProcess,
} from '../types/chattingTypes';
import ChattingRoomOtherMenuButton from './ChattingRoomOtherMenuButton';

interface Props {
  onSendMessage: (contents: string) => Promise<void | undefined>;
  keyboardType?: KeyboardTypeOptions | undefined;
  placeholder: string;
  loading?: boolean;
  registerProcess?: RegisterProcess;
  requestProcess?: RequestProcess;
  chattingType?: ChattingType;
  onOpenBottomSheet?: (value: boolean) => void;
}

interface ChattingRoomOtherMenuButtonPropsType {
  image: ImageSourcePropType;
  backgroundColor: string;
  iconWidth: number;
  iconHeight: number;
  label: string;
  id: number;
  onPress: () => void;
}

export default function RegisterInput({
  onSendMessage,
  keyboardType,
  placeholder,
  loading,
  registerProcess,
  requestProcess,
  chattingType,
  onOpenBottomSheet,
}: Props) {
  const album = require('../../assets/images/album.png');
  const camera = require('../../assets/images/camera.png');
  const searchAddress = require('../../assets/images/searchAddress.png');
  const {onImagePicker, imagePickerResponse, onTakePicture} =
    useCameraAndImagePicker();
  const otherMenuButtonData: ChattingRoomOtherMenuButtonPropsType[] = [
    {
      id: 1,
      image: album,
      backgroundColor: '#1FA676',
      iconWidth: 20,
      iconHeight: 20,
      label: '앨범',
      onPress: () => onImagePicker(),
    },
    {
      id: 2,
      image: camera,
      backgroundColor: '#16C6F2',
      iconWidth: 22.42,
      iconHeight: 20,
      label: '카메라',
      onPress: () => onTakePicture(),
    },
    {
      id: 3,
      image: searchAddress,
      backgroundColor: '#F2542E',
      iconWidth: 22.21,
      iconHeight: 20,
      label: '주소검색',
      onPress: () => onOpenBottomSheet(true),
    },
  ];

  const renderItem = ({
    item,
  }: ListRenderItemInfo<ChattingRoomOtherMenuButtonPropsType>) => {
    return (
      <ChattingRoomOtherMenuButton
        backgroundColor={item.backgroundColor}
        iconHeight={item.iconHeight}
        iconWidth={item.iconWidth}
        image={item.image}
        label={item.label}
        onPress={item?.onPress}
      />
    );
  };
  const {bottom} = useSafeAreaInsets();
  const [textInpuHeight, setTextInputHeight] = useState<number>(0);
  const {isShowKeyboard} = useKeyboard();
  const panY = useRef<Animated.Value>(new Animated.Value(0)).current;
  const [enable, setEnable] = useState<boolean>(false);
  const contents = useInput();

  const onPress = () => {
    contents.onChangeText('');
    onSendMessage(contents.value);
    setTextInputHeight(0);
  };

  const onContentSizeChage = useCallback(
    (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
      const currentHeight = e.nativeEvent.contentSize.height;
      setTextInputHeight(currentHeight);
    },
    [],
  );

  const onPressOtherMenuButton = () => {
    if (!isShowKeyboard) {
      setEnable(!enable);
    } else if (isShowKeyboard) {
      setEnable(!enable);

      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    if (isShowKeyboard) {
      setEnable(false);
    }
  }, [isShowKeyboard, panY]);

  useEffect(() => {
    Animated.timing(panY, {
      toValue: enable ? 149 - bottom : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [enable, panY, bottom]);

  return (
    <>
      <View
        style={{
          height: 'auto',
          maxHeight: 200,
          backgroundColor: '#333333',
        }}>
        <View
          style={[
            styles.box,
            {
              height: 'auto',
              ...Platform.select({
                ios: {
                  paddingBottom: isShowKeyboard ? 8 : 0,
                  minHeight: 60,
                  alignItems: textInpuHeight > 60 ? 'flex-end' : 'center',
                },
                android: {
                  minHeight: 60,
                  alignItems: textInpuHeight > 60 ? 'flex-end' : 'center',
                },
              }),
            },
          ]}>
          {chattingType === 'ChattingWithOthers' ? (
            <TouchableOpacity onPress={onPressOtherMenuButton}>
              <Image
                source={require('../../assets/images/chattingOtherButton.png')}
                style={styles.otherMenuButton}
              />
            </TouchableOpacity>
          ) : null}
          <TextInput
            autoComplete="off"
            // eslint-disable-next-line no-sparse-arrays
            style={[
              styles.input,
              {
                minHeight: 39,
                height: Math.max(39, textInpuHeight),
                maxHeight: bottom + 120,
              },
              chattingType === 'ChattingWithOthers'
                ? {backgroundColor: '#f1f2f4', borderRadius: 5}
                : null,
            ]}
            numberOfLines={5}
            multiline={true}
            value={contents.value}
            onChangeText={contents.onChangeText}
            textAlignVertical="top"
            keyboardType={keyboardType}
            placeholder={placeholder}
            editable={!loading}
            onContentSizeChange={onContentSizeChage}
            placeholderTextColor="#9a99a1"
          />
          <TouchableOpacity
            onPress={onPress}
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
      </View>
      <Animated.View
        style={{
          ...styles.otherMenuContainer,
          height: panY,
        }}>
        <FlatList
          data={otherMenuButtonData}
          renderItem={renderItem}
          horizontal={true}
          contentContainerStyle={{paddingHorizontal: 16, paddingTop: 8}}
          ItemSeparatorComponent={() => {
            return <View style={{width: 32}} />;
          }}
        />
      </Animated.View>
      <View
        style={{height: bottom, backgroundColor: '#ffffff', width: '100%'}}
      />
    </>
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
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  input: {
    width: '80%',
    borderRadius: 10,
    fontSize: 13,
    flexShrink: 1,
    fontFamily: Font.NotoRegular,
    justifyContent: 'center',
    fontWeight: '700',
    color: '#333333',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  sendButton: {
    width: 29,
    height: 29,
    marginLeft: 16,
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
    alignItems: 'flex-end',
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
  otherMenuContainer: {width: '100%', height: 100, backgroundColor: '#ffffff'},
  otherMenuButtonContainer: {
    flexDirection: 'row',
    paddingTop: 54,
    paddingHorizontal: 16,
  },
});
