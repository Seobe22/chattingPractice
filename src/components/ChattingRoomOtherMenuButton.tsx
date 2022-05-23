import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ImageSourcePropType,
  View,
} from 'react-native';
import Font from '../shared/Font';

type Props = {
  image: ImageSourcePropType;
  label: string;
  backgroundColor: string;
  iconWidth: number;
  iconHeight: number;
  onPress: () => void;
};

export default function ChattingRoomOtherMenuButton({
  image,
  label,
  backgroundColor,
  iconWidth,
  iconHeight,
  onPress,
}: Props) {
  const iconSize = {
    width: iconWidth,
    height: iconHeight,
  };

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity
        style={[styles.icon, {backgroundColor: backgroundColor}]}
        onPress={onPress}>
        <Image source={image} style={iconSize} />
      </TouchableOpacity>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 46,
    height: 46,
    borderRadius: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontFamily: Font.NotoRegular,
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 15.93,
    color: '#585858',
  },
});
