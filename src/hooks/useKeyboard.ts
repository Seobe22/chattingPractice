import {Keyboard, Platform} from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useKeyboard() {
  const [isShowKeyboard, setIsShowKeyboard] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<undefined | number>(
    undefined,
  );

  async function storeHeight(height: number | undefined) {
    if (height !== undefined) {
      try {
        await AsyncStorage.setItem('KeyboardHeight', String(height));
        setKeyboardHeight(height);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function getKeyboardHeight(height: number | undefined) {
    try {
      const value = await AsyncStorage.getItem('KeyboardHeight');
      if (value !== null) {
        setKeyboardHeight(Number(value));
      } else {
        storeHeight(height);
      }
    } catch (e) {
      return false;
    }
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      const keyboardWillShowListener = Keyboard.addListener(
        'keyboardDidShow',
        async e => {
          setIsShowKeyboard(true);
          if (keyboardHeight === undefined) {
            getKeyboardHeight(e.startCoordinates?.height);
          }
        },
      );
      const keyboardWillHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => setIsShowKeyboard(false),
      );
      return () => {
        keyboardWillShowListener?.remove();
        keyboardWillHideListener?.remove();
      };
    } else {
      const keyboardWillShowListener = Keyboard.addListener(
        'keyboardWillShow',
        async e => {
          setIsShowKeyboard(true);
          if (keyboardHeight === undefined) {
            getKeyboardHeight(e.startCoordinates?.height);
          }
        },
      );
      const keyboardWillHideListener = Keyboard.addListener(
        'keyboardWillHide',
        () => setIsShowKeyboard(false),
      );
      return () => {
        keyboardWillShowListener?.remove();
        keyboardWillHideListener?.remove();
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowKeyboard]);

  return {
    isShowKeyboard,
    keyboardHeight,
  };
}
