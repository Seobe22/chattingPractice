import {useAppDispatch, useAppSelector} from './hooks';
import {
  setUserPhoneNumber,
  setUserAddress,
  setUserDetailAddress,
  setUserIp,
  setUserNickname,
} from '../slices/registerSlice';
import {useMutation} from 'react-query';
import {register} from '../api/register';

export default function useRegister() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(store => store.registerSlice);
  const mutation = useMutation(register, {
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  const onSetUserNickname = (value: string) => {
    dispatch(setUserNickname({nickname: value}));
  };
  const onSetUserPhoneNumber = (value: string) => {
    dispatch(setUserPhoneNumber({phoneNumber: value}));
  };
  const onSetUserAddress = (value: string | undefined) => {
    dispatch(setUserAddress({address: value}));
  };
  const onSetUserDetailAddress = (value: string) => {
    dispatch(setUserDetailAddress({detailAddress: value}));
  };
  const onSetUserIp = (value: string) => {
    dispatch(setUserIp({userIp: value}));
  };

  return {
    onSetUserNickname,
    onSetUserPhoneNumber,
    onSetUserAddress,
    onSetUserDetailAddress,
    onSetUserIp,
    userInfo,
    mutation,
  };
}
