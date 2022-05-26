import axios from 'axios';
import {RoadAddressResult} from '../types/apiTypes';

export type Parameters = {
  keyword: string;
  page: string;
};

export async function searchRoadAddress({keyword, page}: Parameters) {
  const formData = new FormData();
  formData.append('confmKey', 'U01TX0FVVEgyMDIyMDUxMTEyMTgwMzExMjU1MzE=');
  formData.append('currentPage', page);
  formData.append('countPerPage', '10');
  formData.append('keyword', keyword);
  formData.append('resultType', 'json');
  const result = await axios.post<RoadAddressResult>(
    'https://www.juso.go.kr/addrlink/addrLinkApi.do',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return result;
}

export async function getSearchRoadAddress({keyword, page}: Parameters) {
  const result = await axios.get<RoadAddressResult>(
    `https://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=${page}&countPerPage=30&keyword=${keyword}&confmKey=U01TX0FVVEgyMDIyMDUxMTEyMTgwMzExMjU1MzE=&resultType=json'`,
  );

  return result;
}
