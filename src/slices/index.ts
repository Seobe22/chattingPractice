import {configureStore} from '@reduxjs/toolkit';
import nicknameSlice from './nicknameSlice';
import searchAddressSlice from './searchAddressSlice';
import registerSlice from './registerSlice';

export const store = configureStore({
  reducer: {
    nicknameSlice,
    searchAddressSlice,
    registerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
