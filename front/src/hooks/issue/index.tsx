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

/**
 * @description
 * done이 되지 않은 자신의 지라 이슈들을 모두 가져오는 API 요청 함수를 다루는 커스텀 훅
 *
 * @author bell
 */
export const useGetIssuesNotDone = (projectId: number) => {
  return useQuery(['get-jira-issues-not-done'], () => issue.getIssuesNotDone(projectId));
};
