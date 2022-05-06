import {useState} from 'react';

export default function useInput() {
  const [value, setValue] = useState<string>('');

  const onChangeText = (data: string) => {
    setValue(data);
  };

  return {
    value,
    onChangeText,
  };
}
