import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface NicknameState {
  nickname: string;
}

const initialState: NicknameState = {
  nickname: '',
};

const nicknameSlice = createSlice({
  name: 'nickname',
  initialState,
  reducers: {
    setNickname: (state, action: PayloadAction<NicknameState>) => {
      state.nickname = action.payload.nickname;
    },
  },
});

export default nicknameSlice.reducer;
export const {setNickname} = nicknameSlice.actions;
