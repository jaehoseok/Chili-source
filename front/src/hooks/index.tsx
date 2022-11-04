import { useQuery } from '@tanstack/react-query';

import { user } from 'api/rest';

import { AxiosError } from 'axios';

export const useGetUserInfoHandler = () => {
  return useQuery<Promise<unknown>, AxiosError>(['userInfo'], () => user.getUserInfo(), {
    cacheTime: Infinity,
  });
};
