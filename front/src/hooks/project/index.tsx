import { ChangeEvent } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';

import { project } from 'api/rest';

import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

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

export const usePostCreateProjectHandler = () => {
  return useMutation(({ projectName, projectDescription, image }: createProjectType) =>
    project.postCreateProject(projectName, projectDescription, image),
  );
};
