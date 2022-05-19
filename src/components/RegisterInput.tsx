import React, {useCallback, useEffect, useState} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardTypeOptions,
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
  const contents = useInput();

  const onPress = () => {
    contents.onChangeText('');
    onSendMessage(contents.value);
  };

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

  return (
    <View style={{height: bottom + 60, backgroundColor: '#ffffff'}}>
      <View style={styles.box}>
        <TextInput
          autoComplete="off"
          style={styles.input}
          multiline={false}
          value={contents.value}
          onChangeText={contents.onChangeText}
          textAlignVertical="center"
          keyboardType={keyboardType}
          placeholder={placeholder}
          editable={!loading}
          placeholderTextColor="#9a99a1"
        />
        <TouchableOpacity
          onPress={onPress}
          style={styles.buttonContainer}
          disabled={
            loading ||
            registerProcess === 'searchAddress' ||
            requestProcess === 'requestComplete' ||
            requestProcess === 'selectDateAndTime'
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
    height: 60,
    backgroundColor: '#ffffff',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  input: {
    width: '80%',
    height: 29,
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
});
