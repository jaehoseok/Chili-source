import { ChangeEvent } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';

import { project } from 'api/rest';

/**
 * @description
 * 해당 유저가 가지고 있는 토큰과 연관되는 우리 서비스를 모두 가져오는
 * API 요청 함수를 다루는 custom-hook
 *
 * @author bell
 */
export const useGetProjects = () => {
  return useQuery(['get-projects'], () => project.getProjects(), {
    staleTime: Infinity,
  });
};

/**
 * @description
 * 프로젝트 생성 시켜주는 API 요청 함수를 다루는 custom-hook
 * 로고 이미지를 넣는 경우가 있기 때문에, form-data 형식으로 통신해야한다.
 *
 * @author bell
 */
export const usePostCreateProjectHandler = () => {
  interface requestBodyType {
    projectName: string;
    projectDescription: string;
    image: ChangeEvent<HTMLInputElement>;
  }
  return useMutation(({ projectName, projectDescription, image }: requestBodyType) =>
    project.postCreateProject(projectName, projectDescription, image),
  );
};

/**
 * @description
 * 프로젝트를 삭제시키는 API 요청 함수를 다루는 custom-hook
 *
 * @author bell
 */
export const useDeleteProject = () => {
  interface pathType {
    projectId: number;
  }
  return useMutation(({ projectId }: pathType) => project.deleteProject(projectId));
};

export const usePostConnectTokenToProject = () => {
  interface requestBodyType {
    detail: string;
    name: string;
    projectId: number;
  }
  return useMutation(({ detail, name, projectId }: requestBodyType) =>
    project.postConnectTokenToProject(detail, name, projectId),
  );
};
