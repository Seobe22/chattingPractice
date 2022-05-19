import {setKeyword} from '../slices/searchAddressSlice';
import {useAppDispatch, useAppSelector} from './hooks';

export default function useSearchAddressKeyword() {
  const dispatch = useAppDispatch();
  const searchingKeyword = useAppSelector(
    store => store.searchAddressSlice.keyword,
  );

  const onSetKeyword = (keyword: string) => {
    dispatch(setKeyword({keyword: keyword}));
  };

  return {
    searchingKeyword,
    onSetKeyword,
  };
}
