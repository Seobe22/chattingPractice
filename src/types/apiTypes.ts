/* 주소검색 API */
type Common = {
  totalCount: string;
  currentPage: string;
  countPerPage: string;
  errorCode: string;
  errorMessage: string;
};

export type Address = {
  roadAddr?: string;
  roadAddrPart1?: string;
  roadAddrPart2?: string;
  jibunAddr?: string;
  engAddr?: string;
  zipNo?: string;
  admCd?: string;
  rnMgtSn?: string;
  bdMgtSn?: string;
  detBdNmList?: string;
  bdNm?: string;
  bdKdcd?: string;
  siNm?: string;
  emdNm?: string;
  liNm?: string;
  rn?: string;
  udrtYn?: string;
  buldMnnm?: number;
  buldSlno?: number;
  mtYn?: string;
  lnbrMnnm?: number;
  lnbrSlno?: number;
  emdNo?: string;
  hstryYn?: string;
  relJibun?: string;
  hemdNm?: string;
};

export interface RoadAddressResult {
  results: {
    common: Common;
    juso: Address[];
  };
}

/* 사진전송 api */
export type SendImageResult = {
  result: string;
};
