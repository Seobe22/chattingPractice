import axios from 'axios';
import client from './client';
import {RegisterUserInfo} from '../types/authTypes';
import {RegisterResult, SendCertificationNumber} from '../types/apiTypes';

export async function register({
  address,
  detailAddress,
  nickname,
  phoneNumber,
  userIp,
}: RegisterUserInfo) {
  const data = JSON.stringify({
    nickname: nickname,
    address: address,
    detailAddress: detailAddress,
    phoneNumber: phoneNumber,
    userIp: userIp,
  });
  const result = await client.post<RegisterResult>('/auth/register', data);
  return result;
}

export async function sendCertificationNumberForRegister({
  certificationNumber,
  userIp,
}: SendCertificationNumber) {
  const data: SendCertificationNumber = {
    certificationNumber: certificationNumber,
    userIp: userIp,
  };
  const result = await client.post<RegisterResult>(
    '/auth/certification',
    JSON.stringify(data),
  );

  return result;
}

export async function sendUsersPhoneNumberForRegister({
  phoneNumber,
  userIp,
}: RegisterUserInfo) {
  const data: RegisterUserInfo = {
    phoneNumber: phoneNumber,
    userIp: userIp,
  };

  const result = await client.post<RegisterResult>(
    '/auth/phone',
    JSON.stringify(data),
  );

  return result;
}
