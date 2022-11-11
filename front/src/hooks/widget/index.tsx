import { useQuery } from '@tanstack/react-query';

import { widget } from 'api/rest';

import { AxiosError } from 'axios';

/**
 * @description
 * 비동기 함수 getUserInfo를 수행하는 useQuery 함수를 관리하는 커스텀 훅
 *
 * @author bell
 */
export const useGetWidgetListHandler = (projectId: number) => {
  return useQuery(['widget-list'], () => widget.getWidgetList(projectId), {
    staleTime: Infinity,
  });
};
