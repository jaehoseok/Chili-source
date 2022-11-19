import { useMutation, useQuery } from '@tanstack/react-query';

import { auth } from 'api/rest';

/**
 * @description
 * 토큰을 연동하는 관리하는 커스텀 훅
 *
 * @author bell
 */
export const usePostLinkageTokenHandler = () => {
  interface requestBodyType {
    email?: string;
    tokenCodeId: string;
    value: string;
  }

  return useMutation(({ email, tokenCodeId, value }: requestBodyType) =>
    auth.postLinkageToken(tokenCodeId, value, email),
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
  return useQuery(['get-tokens'], () => auth.getTokens());
};

/**
 * @description
 * 연동한 토큰을 제거하는 API 함수를 호출하는 커스텀 훅
 *
 * @author bell
 */
export const useDeleteLinkageToken = () => {
  return useMutation((tokenCodeId: string) => auth.deleteLinkageToken(tokenCodeId));
};
