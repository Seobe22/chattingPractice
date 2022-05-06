import {TextInput, StyleSheet} from 'react-native';
import React from 'react';

interface CustomInputProps {
  value: string | undefined;
  onChangeText: (data: string) => void;
  onSubmitEditing?: () => void;
}

export default function CustomInput({
  value,
  onChangeText,
  onSubmitEditing,
}: CustomInputProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={styles.inputContainer}
      onSubmitEditing={onSubmitEditing}
    />
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 5,
    width: '80%',
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
});
