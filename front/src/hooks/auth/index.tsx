import { useMutation } from '@tanstack/react-query';

import { auth } from 'api/rest';

/**
 * @description
 * 비동기 함수 getUserInfo를 수행하는 useQuery 함수를 관리하는 커스텀 훅
 *
 * @author bell
 */

interface requestBodyType {
  email: string;
  tokenCodeId: string;
  value: string;
}

export const usePostLinkageTokenHandler = () => {
  return useMutation(({ email, tokenCodeId, value }: requestBodyType) =>
    auth.postLinkageToken(email, tokenCodeId, value),
  );
};
