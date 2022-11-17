import { useMutation, useQuery } from '@tanstack/react-query';

import { issue, project } from 'api/rest';

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
  return useQuery(['get-jira-issues-not-done', projectId], () => issue.getIssuesNotDone(projectId));
};

/**
 * @description
 * issueKey를 통해 지라 이슈의 상세정보를 가져오는 API 요청 함수를 호출하는 커스텀 훅
 *
 * @author bell
 */
export const useGetIssueByIssueKey = (issuekey: string) => {
  return useQuery([`get-jira-issue-by-issue-key-${issuekey}`], () =>
    issue.getIssueByIssueKey(issuekey),
  );
};

/**
 * @description
 * issueKey를 통해 해당 Jira issue의 스토리 포인트와 summary를 업데이트 API 요청 함수를 호출하는 커스텀 훅
 *
 * @author bell
 */
export const useUpdateIssueByIssueKey = () => {
  interface requestBodyType {
    issueKey: string;
    projectId: number;
    statusId: number;
    storyPoints: number;
    summary: string;
  }
  return useMutation(({ issueKey, projectId, statusId, storyPoints, summary }: requestBodyType) =>
    issue.updateIssueByIssueKey(issueKey, projectId, statusId, storyPoints, summary),
  );
};
