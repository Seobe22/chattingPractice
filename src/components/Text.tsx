import React from 'react';
import {Platform, StyleProp, Text as Texts, TextStyle} from 'react-native';

type Props = {
  children: React.ReactNode;
  style: StyleProp<TextStyle>;
};

export default function Text({children, style}: Props) {
  return (
    <Texts
      {...style}
      allowFontScaling={false}
      {...Platform.select({
        android: {
          includeFontPadding: false,
        },
      })}>
      {children}
    </Texts>
  );
}
