import {KeyboardAvoidingView, StyleSheet, Platform} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
};
export default function KeyboardAvoidingViews({children}: Props) {
  const {top} = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={top + 10}>
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(23, 84, 252, 0.1)',
    flex: 1,
    width: '100%',
  },
});
