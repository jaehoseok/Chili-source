import { ChangeEvent } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { project } from 'api/rest';
import { useParams } from 'react-router-dom';

/**
 * @description
 * 해당 프로젝트id의 데이터를 가져오는 API 요처함수를 다루는 custom-hook
 *
 * @author bell
 */
export const useGetProject = (projectId: number) => {
  return useQuery(['get-project', projectId], () => project.getProject(projectId));
};

/**
 * @description
 * 해당 유저가 가지고 있는 토큰과 연관되는 우리 서비스를 모두 가져오는
 * API 요청 함수를 다루는 custom-hook
 *
 * @author bell
 */
export const useGetProjects = () => {
  return useQuery(['get-projects'], () => project.getProjects());
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

/**
 * @description
 * 생성한 프로젝트와 토큰을 연결하는 API 요청 함수를 다루는 custom-hook
 *
 * @author bell
 */
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

/**
 * @description
 * 해당 프로젝트에 참가하고 있는 모든 팀원을 불러오는 API 요청 함수를 다루는 custom-hook
 *
 * @author bell
 */
export const useGetTeamForProject = (projectId: number) => {
  return useQuery(['get-team-for-project', projectId], () => project.getTeamForProject(projectId));
};

/**
 * @description
 * 프로젝트의 제목과 설명을 수정하는 API 요청하는 함수를 다루는 custom-hook
 *
 * @author bell
 */
export const useUpdateProject = () => {
  interface requestBodyType {
    projectId: number;
    projectName: string;
    projectDescription: string;
  }
  return useMutation(({ projectId, projectName, projectDescription }: requestBodyType) =>
    project.updateProject(projectId, projectName, projectDescription),
  );
};

/**
 * @description
 * 프로젝트의 로고를 수정하는 API 요청하는 함수를 다루는 custom-hook
 *
 * @author bell
 */
export const useUpdateProjectImage = () => {
  interface requestType {
    projectId: number;
    image: ChangeEvent<HTMLInputElement>;
  }

  return useMutation(({ projectId, image }: requestType) =>
    project.updateProjectImage(projectId, image),
  );
};

/**
 * @description
 * 프로젝트에 참여하는 유저들의 권한 수정을 요청하는 함수를 다루는 custom-hook
 *
 * @author bell
 */
export const useUpdateTeamRole = () => {
  interface requestType {
    projectId: number;
    roleId: string;
    userId: number;
  }

  return useMutation(({ projectId, roleId, userId }: requestType) =>
    project.updateTeamRole(projectId, roleId, userId),
  );
};

/**
 * @description
 * 프로젝트에 참여하는 유저들의 색상 변경을 요청하는 함수를 다루는 custom-hook
 *
 * @author bell
 */
export const useUpdateTeamColor = () => {
  interface requestType {
    projectId: number;
    userColor: string;
    userId: number;
  }

  const queryClient = useQueryClient();

  return useMutation(
    ({ projectId, userColor, userId }: requestType) =>
      project.updateTeamColor(projectId, userColor, userId),
    {
      onSuccess: () => {
        // 요청이 성공한 경우, 캘린더와 간트 데이터의 유효성을 제거한다.
        queryClient.invalidateQueries(['gantt-tasks']);
        queryClient.invalidateQueries(['get-gantt-chart']);
      },
    },
  );
};

/**
 * @description
 * 프로젝트에 유저를 초대하는 API 요청하는 함수를 다루는 커스텀 훅
 *
 * @author bell
 */
export const usePostInviteTeam = () => {
  interface requestBodyType {
    projectId: number;
    userId: number;
  }
  return useMutation(({ projectId, userId }: requestBodyType) =>
    project.postInviteTeam(projectId, userId),
  );
};

/**
 * @description
 * 프로젝트에서 해당 유저를 강퇴시키는 API를 요청하는 함수를 다루는 커스텀 훅
 *
 * @author bell
 */
export const useDeleteFireTeam = () => {
  interface queryType {
    fireUserId: number;
    projectId: number;
  }
  return useMutation(({ fireUserId, projectId }: queryType) =>
    project.deleteTeamFire(fireUserId, projectId),
  );
};

/**
 * @description
 * 이미 db에 있는 이슈들을 캘린더와 간트차트에 렌더링하기 위해 요청하는 API 함수를 다루는 커스텀 훅
 *
 * @author bell
 */
export const useGetGanttChart = (
  op: number,
  projectId: number,
  userId?: number,
  start?: string,
  end?: string,
) => {
  return useQuery(['get-gantt-chart', projectId], () =>
    project.getGanttChart(op, projectId, userId, start, end),
  );
};

/**
 * @description
 * 이미 db에 있는 간트 데이터를 API에 적합하게 변형하는 커스텀 훅
 *
 * @author inte
 */
export const useGetGanttTasks = (op: number, userId?: number, start?: string, end?: string) => {
  // Init
  interface task {
    id: string;
    type: 'task' | 'milestone' | 'project';
    name: string;
    start: Date;
    end: Date;
    progress: number;
    styles?: {
      backgroundColor?: string;
      backgroundSelectedColor?: string;
      progressColor?: string;
      progressSelectedColor?: string;
    };
    isDisabled?: boolean;
    project?: string;
    dependencies?: string[];
    hideChildren?: boolean;
    displayOrder?: number;
  }
  const { projectId } = useParams();

  return useQuery(['gantt-tasks', projectId], async () => {
    // 컬러 팔레트
    const teamData = await project.getTeamForProject(Number(projectId));
    const colorPalette = new Map<number, string>();
    teamData.map(({ userId, userColor }) => {
      colorPalette.set(userId, userColor);
    });

    const resp = await project.getGanttChart(op, Number(projectId), userId, start, end);

    const tasks: task[] = [];
    resp.map(item => {
      const tempTask: task = {
        displayOrder: Number(item.userId),
        start: new Date(item.startTime),
        end: new Date(item.endTime),
        name: item.issueSummary,
        id: String(item.id),
        progress: item.progress,
        type: 'task',
        styles: {
          backgroundColor: colorPalette.get(Number(item.userId)),
          backgroundSelectedColor: colorPalette.get(Number(item.userId)),
          progressColor: '#aeb8c2',
          progressSelectedColor: '#aeb8c2',
        },
      };

      tasks.push(tempTask);
    });

    return tasks;
  });
};

/**
 * @description
 * 새로운 간트차트를 생성하기 위해 요청하는 API 함수를 다루는 커스텀 훅
 *
 * @author bell
 */
export const usePostCreateGantt = () => {
  interface requestBodyType {
    issueCode: string;
    issueSummary: string;
    projectId: number;
    userId: number;
    startTime: string;
    endTime: string;
    // 캘린더에서는 version과 progress가 없다.
    progress?: number;
    version?: number;
  }
  return useMutation(
    ({
      issueCode,
      issueSummary,
      projectId,
      userId,
      startTime,
      endTime,
      progress,
      version,
    }: requestBodyType) =>
      project.postCreateGantt(
        issueCode,
        issueSummary,
        projectId,
        userId,
        startTime,
        endTime,
        progress,
        version,
      ),
  );
};

/**
 * @description
 * 현재 간트차트를 수정하는 API 요청을 다루는 커스텀 훅
 *
 * @author bell
 */
export const useUpdateGantt = () => {
  // Init
  interface requestBodyType {
    id: number;
    issueCode?: string;
    issueSummary?: string;
    userId?: number;
    startTime?: string;
    endTime?: string;
    progress?: number;
  }

  const queryClient = useQueryClient();

  // Return
  return useMutation(
    ({ id, issueCode, issueSummary, userId, startTime, endTime, progress }: requestBodyType) =>
      project.updateGantt(id, issueCode, issueSummary, userId, startTime, endTime, progress),
    {
      onSuccess: () => {
        // 요청이 성공한 경우, 캘린더와 간트 데이터의 유효성을 제거한다.
        queryClient.invalidateQueries(['gantt-tasks']);
        queryClient.invalidateQueries(['get-gantt-chart']);
      },
    },
  );
};

/**
 * @description
 * 현재 간트차트를 삭제하는 API 요청을 다루는 커스텀 훅
 *
 * @author bell
 */
export const useDeleteGantt = () => {
  // Init
  const queryClient = useQueryClient();

  // Return
  return useMutation((ganttChartId: number) => project.deleteGantt(ganttChartId), {
    onSuccess: () => {
      // 요청이 성공한 경우, 캘린더와 간트 데이터의 유효성을 제거한다.
      queryClient.invalidateQueries(['gantt-tasks']);
      queryClient.invalidateQueries(['get-gantt-chart']);
    },
  });
};
