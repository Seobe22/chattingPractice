import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  PanResponder,
  PanResponderInstance,
  Platform,
  StatusBar,
  NativeModules,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  isShowBottomSheet: boolean;
  children?: React.ReactNode;
  setIsShowBottomSheet: (value: boolean) => void;
  androidStatusBarHeight?: number;
};
const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;

export default function BottomSheet({
  isShowBottomSheet,
  children,
  setIsShowBottomSheet,
  androidStatusBarHeight,
}: Props) {
  const {bottom, top} = useSafeAreaInsets();
  const panY = useRef<Animated.Value>(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponder = useRef<PanResponderInstance>(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (isShowBottomSheet) {
      resetBottomSheet.start();
    } else {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowBottomSheet]);
  const closeModal = () => {
    closeBottomSheet.start(() => {
      setIsShowBottomSheet(false);
    });
  };

  return (
    <Modal
      visible={isShowBottomSheet}
      animationType="fade"
      transparent={true}
      statusBarTranslucent>
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.modalContents,
            height:
              Platform.OS === 'ios'
                ? screenHeight - (60 + top)
                : windowHeight - (60 + top),
            paddingBottom: bottom,
            transform: [{translateY: translateY}],
          }}>
          <Animated.View
            style={styles.sheetBarContainer}
            {...panResponder.panHandlers}>
            <View style={styles.sheetBar} />
          </Animated.View>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  background: {
    flex: 1,
  },
  modalContents: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  sheetBarContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  sheetBar: {
    backgroundColor: '#aeaeae',
    width: 37,
    height: 3,
    borderRadius: 3,
  },
});
