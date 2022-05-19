import {configureStore} from '@reduxjs/toolkit';
import nicknameSlice from './nicknameSlice';

export const store = configureStore({
  reducer: {
    nicknameSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
