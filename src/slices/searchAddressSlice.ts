import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface SearchState {
  keyword: string;
}

const initialState: SearchState = {
  keyword: '',
};

const searchAddressSlice = createSlice({
  name: 'searchingKeyword',
  initialState,
  reducers: {
    setKeyword: (state, action: PayloadAction<SearchState>) => {
      state.keyword = action.payload.keyword;
    },
  },
});

export default searchAddressSlice.reducer;
export const {setKeyword} = searchAddressSlice.actions;
