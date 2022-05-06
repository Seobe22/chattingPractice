import create from 'zustand';
import {devtools} from 'zustand/middleware';

interface NumberState {
  number: number;
  addNumber: () => void;
}

export const useCountStore = create<NumberState>()(
  devtools(set => ({
    number: 0,
    addNumber: () =>
      set(state => ({
        number: state.number + 1,
      })),
  })),
);
