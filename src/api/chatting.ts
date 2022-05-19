import client from './client';
import {SendImageResult} from '../types/apiTypes';

export default async function sendImageToServer(params: FormData) {
  const reponse = await client.post<SendImageResult>('/chat/image', params, {
    headers: {
      'Content-Type': 'multipart/form-data;',
    },
  });
  return reponse.data;
}
