import { useQuery } from '@tanstack/react-query';

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

export const useGetProjectWithTokenHandler = () => {
  return useQuery<projectType[], AxiosError>(
    ['project-with-token'],
    () => project.getProjectWithToken(),
    {
      staleTime: Infinity,
    },
  );
};
