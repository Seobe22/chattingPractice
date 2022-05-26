import {useState} from 'react';
import {setIsOpen} from '../slices/bottomMenuBarSlice';
import {useAppDispatch, useAppSelector} from './hooks';

export default function useChattingRoomBottomMenuBar() {
  const dispatch = useAppDispatch();
  const isShowBottomMenuBar = useAppSelector(
    store => store.bottomMenuBarSlice.isOpen,
  );

  const onSwitchBottomMenuBar = (value: boolean) => {
    dispatch(setIsOpen({isOpen: value}));
  };

  return {
    isShowBottomMenuBar,
    onSwitchBottomMenuBar,
  };
}
