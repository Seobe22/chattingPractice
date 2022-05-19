import {useMutation} from 'react-query';
import sendImageToServer from '../api/chatting';

export default function useSendImage() {
  const mutation = useMutation(sendImageToServer, {
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  return mutation;
}
