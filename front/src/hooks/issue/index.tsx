import { useQuery } from '@tanstack/react-query';

import { issue } from 'api/rest';

import { AxiosError } from 'axios';

/**
 * @description
 * 비동기 함수 getUserInfo를 수행하는 useQuery 함수를 관리하는 커스텀 훅
 *
 * @author bell
 */
export const useGetJiraProjectList = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<any, AxiosError>(['jira-project-list'], () => issue.getJiraProjectList(), {
    enabled: false,
  });
};
