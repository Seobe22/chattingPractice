import {useQueries, useMutation} from 'react-query';
import {searchRoadAddress} from '../api/searchAddress';
import {Address} from '../types/apiTypes';
import {useState} from 'react';

export default function useSearchAddress() {
  const [addressData, setAddressData] = useState<Address[] | null>(null);
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

  return {mutation, addressData};
}
