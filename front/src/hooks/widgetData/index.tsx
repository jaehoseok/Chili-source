//  API & Library
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { widgetData } from 'api/rest';

/**
 * @description
 * CALENDAR 위젯 데이터를 가져오는 쿼리 커스텀 훅 ==========
 *
 * @author inte
 */
export const useGetWidgetCalendarData = () => {
  // Init
  const { projectId } = useParams();

  // Return
  return useQuery(
    ['widget-calendar', projectId],
    () => widgetData.getWidgetCalendarData(Number(projectId)),
    {
      staleTime: Infinity,
    },
  );
};

export const useSetWidgetCalendarData = () => {
  // Init
  const queryClient = useQueryClient();

  // Return
  return useMutation(async () => console.log('[캘린더 리렌더링]'), {
    onSuccess: () => {
      queryClient.invalidateQueries(['widget-calendar']);
    },
  });
};

/**
 * @description
 * JIRA 위젯 데이터를 가져오는 쿼리 커스텀 훅 ==========
 *
 * @author inte
 */
export const useGetWidgetJiraData = () => {
  // Init
  const { projectId } = useParams();

  // Return
  return useQuery(
    ['widget-jira', projectId],
    () => widgetData.getWidgetJiraData(Number(projectId)),
    {
      staleTime: Infinity,
    },
  );
};

export const useSetWidgetJiraData = () => {
  // Init
  const queryClient = useQueryClient();

  // Return
  return useMutation(async () => console.log('[지라 리렌더링]'), {
    onSuccess: () => {
      queryClient.invalidateQueries(['widget-jira']);
    },
  });
};
