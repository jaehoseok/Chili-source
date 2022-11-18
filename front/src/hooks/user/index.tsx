import { useQuery, useMutation } from '@tanstack/react-query';

import { user } from 'api/rest';

import { AxiosError } from 'axios';
import { ChangeEvent } from 'react';

// react-query 함수는 모두 커스텀 훅으로 관장한다.
// 모듈화하여 가독성 및 확장 수정이 훨씬 편해지며,
// click 하여 가져오거나 changeEvent에 반영하여 react-query를 사용하기 편해진다.
// 또한 api와 react-query가 여기서 모이는 브릿지 역할을 하게 된다.
// api 폴더와 구조가 똑같게 하여, 파악도 편하게 했다.

// 서버와 정상적으로 통신이 되는 경우 오게되는
// 반환 데이터의 타입을 interface로 선언해준다.
// 이걸 해서 useQuery의 성공 데이터 타입을 똑같이 맞춰줘야
// 타입스크립트에서 react-query를 사용하기 한결 수월해진다.

/**
 * @description
 * 비동기 함수 getUserInfo를 수행하는 useQuery 함수를 관리하는 커스텀 훅
 *
 * @author bell
 */
export const useGetUserInfoHandler = () => {
  interface userInfoType {
    id: number;
    image: string;
    name: string;
  }
  return useQuery<userInfoType, AxiosError>(['userInfo'], () => user.getUserInfo(), {
    staleTime: Infinity,
  });
};

/**
 * @description
 * 팀원 초대에 필요한 유저 검색 데이터 요청 함수를 호출하는 커스텀 훅
 *
 * @author bell
 */
export const useGetUserSearch = (email: string) => {
  return useQuery(['get-user-search'], () => user.getUserSearch(email), { enabled: false });
};

/**
 * @description
 * 유저 이미지 수정을 요청하는 API 함수를 호출하는 커스텀 훅
 *
 * @author bell
 */
export const useUpdateUserImage = () => {
  return useMutation((image: ChangeEvent<HTMLInputElement>) => user.updateUserImage(image));
};

/**
 * @description
 * 유저 이름 수정을 요청하는 API 함수를 호출하는 커스텀 훅
 *
 * @author bell
 */
export const useUpdateUserName = () => {
  return useMutation((name: string) => user.updateUserName(name));
};
