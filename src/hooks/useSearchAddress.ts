import {useQueries, useMutation} from 'react-query';
import {searchRoadAddress} from '../api/searchAddress';
import {Address} from '../types/apiTypes';
import {useState} from 'react';
import {setKeyword} from '../slices/searchAddressSlice';
import {useAppDispatch, useAppSelector} from './hooks';

export default function useSearchAddress() {
  const [addressData, setAddressData] = useState<Address[] | null>(null);
  const dispatch = useAppDispatch();
  const searchingKeyword = useAppSelector(
    store => store.searchAddressSlice.keyword,
  );

  const onSetKeyword = (keyword: string) => {
    dispatch(setKeyword({keyword: keyword}));
  };
  const mutation = useMutation(searchRoadAddress, {
    onSuccess: data => {
      const address = data.data.results.juso;
      if (addressData === null) {
        setAddressData(address);
      } else {
        setAddressData([...addressData, ...address]);
      }
    },
    onError: error => {
      console.log(error);
    },
  });

  const onResetAddressDate = () => {
    setAddressData(null);
  };

  return {
    mutation,
    addressData,
    onResetAddressDate,
    searchingKeyword,
    onSetKeyword,
  };
}
