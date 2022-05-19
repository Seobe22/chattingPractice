/* 채팅관련 타입 */
export type Chatting = {
  id: number;
  type: MessageType;
  contents?: string;
  time?: string;
  nickname?: string | null;
  requestDate?: string;
  requestTime?: string;
  requestContents?: string;
  address?: string;
};

export type MessageType =
  | 'bot'
  | 'user'
  | 'button'
  | 'datepicker'
  | 'checkErrend'
  | 'checkAddress'
  | 'timepicker';

export type RegisterProcess =
  | 'sendPhoneNumber'
  | 'sendCertificationNumber'
  | 'searchAddress'
  | 'setDetailAddress'
  | 'setNickname'
  | 'regist';

export type RequestProcess =
  | 'selectServiceType'
  | 'selectServiceContents'
  | 'selectDateAndTime'
  | 'requestComplete';
