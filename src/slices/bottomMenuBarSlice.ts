import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface BottomMenuBarState {
  isOpen: boolean;
}

const initialState: BottomMenuBarState = {
  isOpen: false,
};

const bottomMenuBarSlice = createSlice({
  name: 'bottomMenuBar',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<BottomMenuBarState>) => {
      state.isOpen = action.payload.isOpen;
    },
  },
});

export default bottomMenuBarSlice.reducer;
export const {setIsOpen} = bottomMenuBarSlice.actions;
