//  API & Library
import { useQuery } from '@tanstack/react-query';
import { widgetData } from 'api/rest';

export const useGetWidgetCalendarData = (projectId: number) => {
  return useQuery(['widget-calendar'], () => widgetData.getWidgetCalendarData(projectId), {
    staleTime: Infinity,
  });
};
