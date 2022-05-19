import axios from 'axios';

const baseUrl = 'https://appdev.tideflo.work';

const client = axios.create({
  baseURL: baseUrl,
});

export default client;
