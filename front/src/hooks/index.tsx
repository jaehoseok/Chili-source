import { useQuery } from '@tanstack/react-query';

import { user } from 'api/rest';

import { AxiosError } from 'axios';

interface userInfoType {
  id: number;
  image: string;
  name: string;
}

export const useGetUserInfoHandler = () => {
  return useQuery<userInfoType, AxiosError>(['userInfo'], () => user.getUserInfo(), {
    staleTime: Infinity,
  });
};
