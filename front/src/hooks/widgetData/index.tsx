//  API & Library
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { widgetData, project } from 'api/rest';

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
 * GANTT 위젯 데이터를 가져오는 쿼리 커스텀 훅 ==========
 *
 * @author inte
 */
export const useGetWidgetGanttData = () => {
  // Init
  interface responseType {
    name?: string;
    img?: string;
    color?: string;
    issueSummary?: string;
    userId?: number;
    startTime?: Date;
    endTime?: Date;
    progress?: number;
    version?: number;
  }

  const { projectId } = useParams();

  // Return
  return useQuery(
    ['widget-gantt', projectId],
    async () => {
      // 컬러 팔레트
      const teamData = await project.getTeamForProject(Number(projectId));
      const userData = new Map<number, string[]>();
      teamData.map(({ userId, userColor, userImage, userName }) => {
        userData.set(userId, [userName, userImage, userColor]);
      });

      const ganttData = await widgetData.getWidgetGanttData(Number(projectId));

      const issueData: responseType[] = [];

      ganttData.map(({ userId, issueSummary, startTime, endTime, progress, version }) => {
        const tempUserData = userData.get(userId);
        issueData.push({
          name: tempUserData ? tempUserData[0] : '유저 명',
          img: tempUserData ? tempUserData[1] : '',
          color: tempUserData ? tempUserData[2] : 'gray',
          issueSummary,
          userId,
          startTime,
          endTime,
          progress,
          version,
        });
      });

      console.log('[issueData]', issueData);

      return issueData;
    },
    {
      staleTime: Infinity,
    },
  );
};

export const useSetWidgetGanttData = () => {
  // Init
  const queryClient = useQueryClient();

  // Return
  return useMutation(async () => console.log('[간트 리렌더링]'), {
    onSuccess: () => {
      queryClient.invalidateQueries(['widget-gantt']);
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
