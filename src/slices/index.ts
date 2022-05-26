import {configureStore} from '@reduxjs/toolkit';
import nicknameSlice from './nicknameSlice';
import searchAddressSlice from './searchAddressSlice';
import registerSlice from './registerSlice';
import bottomMenuBarSlice from './bottomMenuBarSlice';

export const store = configureStore({
  reducer: {
    nicknameSlice,
    searchAddressSlice,
    registerSlice,
    bottomMenuBarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
