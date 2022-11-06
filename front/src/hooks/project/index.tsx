import { ChangeEvent } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';

import { project } from 'api/rest';

import { AxiosError } from 'axios';

export interface projectType {
  description: 'string';
  gitRepo: 'string';
  id: 0;
  image: 'string';
  jiraProject: 'string';
  latestGanttVersion: 0;
  name: 'string';
  tokenList: ['string'];
}

/**
 * @description
 * 해당 유저가 가지고 있는 토큰과 연관되는 우리 서비스를 모두 가져오는
 * API 요청 함수를 다루는 custom-hook
 *
 * @author bell
 */
export const useGetProjectWithTokenHandler = () => {
  return useQuery<projectType[], AxiosError>(
    ['project-with-token'],
    () => project.getProjectWithToken(),
    {
      staleTime: Infinity,
    },
  );
};

export interface createProjectType {
  projectName: string;
  projectDescription: string;
  image: ChangeEvent<HTMLInputElement>;
}

/**
 * @description
 * 프로젝트 생성 시켜주는 API 요청 함수를 다루는 custom-hook
 * 로고 이미지를 넣는 경우가 있기 때문에, form-data 형식으로 통신해야한다.
 *
 * @author bell
 */
export const usePostCreateProjectHandler = () => {
  return useMutation(({ projectName, projectDescription, image }: createProjectType) =>
    project.postCreateProject(projectName, projectDescription, image),
  );
};
