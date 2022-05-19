import {setNickname} from '../slices/nicknameSlice';
import {useAppDispatch, useAppSelector} from './hooks';

export default function useNickname() {
  const dispatch = useAppDispatch();
  const nickname = useAppSelector(store => store.nicknameSlice.nickname);

  const onSetNickname = (value: string) => {
    dispatch(setNickname({nickname: value}));
  };

  return {
    onSetNickname,
    nickname,
  };
}
