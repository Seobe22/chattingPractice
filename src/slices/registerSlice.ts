import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RegisterUserInfo} from '../types/authTypes';

const initialState: RegisterUserInfo = {
  nickname: undefined,
  address: undefined,
  detailAddress: undefined,
  phoneNumber: undefined,
  userIp: undefined,
};

const registerSlice = createSlice({
  name: 'registerUserInfo',
  initialState,
  reducers: {
    setUserPhoneNumber: (state, action: PayloadAction<RegisterUserInfo>) => {
      state.phoneNumber = action.payload.phoneNumber;
    },
    setUserAddress: (state, action: PayloadAction<RegisterUserInfo>) => {
      state.address = action.payload.address;
    },
    setUserDetailAddress: (state, action: PayloadAction<RegisterUserInfo>) => {
      state.detailAddress = action.payload.detailAddress;
    },
    setUserNickname: (state, action: PayloadAction<RegisterUserInfo>) => {
      state.nickname = action.payload.nickname;
    },
    setUserIp: (state, action: PayloadAction<RegisterUserInfo>) => {
      state.userIp = action.payload.userIp;
    },
  },
});

export default registerSlice.reducer;
export const {
  setUserPhoneNumber,
  setUserAddress,
  setUserDetailAddress,
  setUserIp,
  setUserNickname,
} = registerSlice.actions;
