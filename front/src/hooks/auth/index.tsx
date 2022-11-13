import { useMutation, useQuery } from '@tanstack/react-query';

import { auth } from 'api/rest';

interface requestBodyType {
  email: string;
  tokenCodeId: string;
  value: string;
}

/**
 * @description
 * 비동기 함수 getUserInfo를 수행하는 useQuery 함수를 관리하는 커스텀 훅
 *
 * @author bell
 */
export const usePostLinkageTokenHandler = () => {
  return useMutation(({ email, tokenCodeId, value }: requestBodyType) =>
    auth.postLinkageToken(email, tokenCodeId, value),
  );
};

/**
 * @description
 * 토큰 코드 리스트를 조회
 *
 * @author bell
 */
export const useGetTokenCodes = () => {
  return useQuery(['get-token-codes'], () => auth.getTokenCodes());
};

/**
 * @description
 * 해당 유저가 연동한 지라, 깃 토큰 조회
 *
 * @author bell
 */
export const useGetTokens = () => {
  return useQuery(['get-tokens'], () => auth.getTokens(), {
    staleTime: Infinity,
  });
};
