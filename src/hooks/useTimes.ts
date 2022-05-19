import {useState} from 'react';
import dayjs from 'dayjs';
export default function useTimes() {
  const times: number = Number(dayjs().format('HH:mm').split(':')[0]);
  const minitues: number = Number(dayjs().format('HH:mm').split(':')[1]);
  const displayTime =
    times > 12
      ? `오후 ${times - 12}:${minitues < 10 ? '0' + minitues : minitues}`
      : `오전 ${times}:${minitues < 10 ? '0' + minitues : minitues}`;
}
