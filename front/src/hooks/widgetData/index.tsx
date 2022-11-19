//  API & Library
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { widgetData } from 'api/rest';

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
