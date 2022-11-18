// API & Library
import { createAxiosApi } from 'api/axios';

import { ChangeEvent } from 'react';

// Init
const projectAxios = createAxiosApi('project-service');

/**
 * @description
 * http://k7b2071.p.ssafy.io/project-service/ 이하의 url의 요청을 보낼 프라미스 객체를 리턴하는 함수들
 *
 * @example
 * ```
 * // rest 라이브러리 임포트
 * import { project } from 'api/rest'
 *
 * // IFFE 방식 또는 프라미스 객체를 활용하는 어떤 방법이던 상관없음
 * ( async () => {const tokenCodes = await project.getTokenCodes} )();
 * ```
 *
 * @author inte
 */

export default {
  /**
   * @description
   * project 리스트 조회 코드에 대한 제안
   * 각 요청 간에 반환하는 response 객체가 상이하므로
   * 요청 코드 내에 interface responseType 을 가지도록
   * 구현하는 것이 어떤가 생각해보았습니다.
   *
   * @example
   *```typescript
   * // 사용예시
   * import { project } from 'api/rest';
   *
   * const index = () => {
   *   const [projectList, setProjectList] = useState<Awaited<ReturnType<typeof project.getProjectList>>>();
   *
   *   useEffect(() => {
   *     (async () => {
   *       const ans = await project.getProjectList();
   *       setProjectList(ans);
   *     })();
   *   }, []);
   *
   * return (
   *   <div>
   *     {projectList ?
   *       projectList.map((item, index) => (
   *         <div key={index}>
   *           <div>[id]: {item.id}</div>
   *             <div>[name]: {item.name}</div>
   *             <div>[description]: {item.description}</div>
   *             <div>[image]: {item.image}</div>
   *             <div>[latestGanttVersion]: {item.latestGanttVersion}</div>
   *             <div>[jiraProject]: {item.jiraProject}</div>
   *             <div>[gitRepo]: {item.gitRepo}</div>
   *             <div>==========</div>
   *           </div>
   *         )) : ''
   *     }
   *   </div>
   *   );
   * };
   * ```
   * @author inte
   */
  getProjectList: () => {
    interface responseType {
      id: string;
      name: string;
      description: string;
      image: string;
      latestGanttVersion: number;
      jiraProject: string | null;
      gitRepo: string | null;
      tokenList: string[];
    }

    return new Promise<responseType[]>((resolve, reject) => {
      projectAxios
        .get(`/project`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getProject: (projectId: number) => {
    interface responseType {
      id: string;
      name: string;
      description: string;
      image: string;
      latestGanttVersion: number;
      jiraProject: string | null;
      gitRepo: string | null;
      tokenList: string[];
    }

    return new Promise<responseType>((resolve, reject) => {
      projectAxios
        .get(`/project/${projectId}`)
        .then(response => {
          console.log(response.data);
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * @description
   * 해당 유저가 가지고 있는 토큰과 연동되는 모든 우리 서비스의 프로젝트들을 주는 API
   *
   * @author bell
   */
  getProjects: async () => {
    interface responseType {
      id: number;
      name: string;
      description: string;
      image: string;
      gitRepo: string | null;
      latestGanntVersion: 0;
      tokenList: string[];
    }

    return new Promise<responseType[]>((resolve, reject) => {
      projectAxios
        .get('/project')
        .then(response => {
          console.log(response.data);
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * @description
   * 프로젝트를 생성하는 API
   *
   * @requestBody {string}                              name           - 프로젝트의 이름
   * @requestBody {string}                              description    - 프로젝트의 상세 내용
   * @requestBody {ChangeEvent<HTMLInputElement>}       image          - file input의 ChangeEvent가 가지고 있는 데이터
   * @author bell
   */
  postCreateProject: async (
    name: string,
    description: string,
    image: ChangeEvent<HTMLInputElement>,
  ) => {
    interface responseType {
      data: number;
    }
    try {
      const formData = new FormData();
      const data = {
        description,
        name,
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (image) formData.append('image', image.target.files[0]);
      formData.append('request', new Blob([JSON.stringify(data)], { type: 'application/json' }));
      const response: responseType = await projectAxios.post('/project', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * @descripton
   * 해당 프로젝트를 삭제하는 API
   *
   * @param {number} projectId
   *
   * @author bell
   */
  deleteProject: async (projectId: number) => {
    try {
      await projectAxios.delete(`/project/${projectId}`);
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * @description
   * 생성한 프로젝트와 토큰을 연동하는 API
   *
   * @requestBody {string}              detail        -  Token 값
   * @requestBody {string}              name          -  어떤 토큰 인지 (JIRA, SSAFYGITLAB)
   * @requestBody {number}              projectId     -  연결할 projectId
   *
   * @author bell
   */
  postConnectTokenToProject: async (detail: string, name: string, projectId: number) => {
    try {
      await projectAxios.post('/project/token', {
        detail,
        name,
        projectId,
      });
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * @description
   * 프로젝트에 참여하고 있는 팀원 목록 조회
   *
   * @author bell
   */
  getTeamForProject: (projectId: number) => {
    interface responseType {
      projectId: number;
      role: {
        fire: boolean;
        id: string;
        invite: boolean;
        modify: boolean;
        remove: boolean;
      };
      userColor: string;
      userId: number;
      userImage: string;
      userName: string;
    }
    return new Promise<responseType[]>((resolve, reject) => {
      projectAxios
        .get(`/team/${projectId}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * @descripton
   * 프로젝트의 제목과 설명 글을 수정합니다.
   *
   * @author bell
   */
  updateProject: async (id: number, name: string, description: string) => {
    try {
      await projectAxios.put(`/project`, {
        id,
        name,
        description,
      });
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * @descripton
   * 프로젝트의 로고를 수정합니다.
   *
   * @author bell
   */
  updateProjectImage: async (id: number, image: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    formData.append('image', image.target.files[0]);
    try {
      const response = await projectAxios.put(`/project/image/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * @descripton
   * 프로젝트에 참여하는 유저의 권한을 수정합니다
   *
   * @author bell
   */
  updateTeamRole: async (projectId: number, roleId: string, userId: number) => {
    try {
      await projectAxios.put(`/team/role`, {
        projectId,
        roleId,
        userId,
      });
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * @description
   * 프로젝트에 참여하는 유저의 색상을 변경합니다.
   *
   * @author bell
   */
  updateTeamColor: async (projectId: number, userColor: string, userId: number) => {
    try {
      await projectAxios.put(`/team`, {
        projectId,
        userColor,
        userId,
      });
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * @description
   * 프로젝트에 팀원을 초대합니다
   *
   * @author bell
   */
  postInviteTeam: async (projectId: number, userId: number) => {
    try {
      await projectAxios.post('/team', {
        projectId,
        userId,
      });
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * @description
   * 프로젝트에 팀원을 강퇴합니다
   *
   * @author bell
   */
  deleteTeamFire: async (fireUserId: number, projectId: number) => {
    try {
      await projectAxios.delete('/team/fire', {
        params: {
          fireUserId,
          projectId,
        },
      });
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * @description
   * 해당 프로젝트에 간트/캘린더와 매핑한 이슈를 가져옵니다
   *
   * @author bell
   */
  getGanttChart: async (
    op: number,
    projectId: number,
    userId?: number,
    start?: string,
    end?: string,
  ) => {
    interface responseType {
      startTime: string;
      endTime: string;
      id: number;
      issueCode: string;
      issueSummary: string;
      progress: number;
      userId: string;
      version: number;
    }

    return new Promise<responseType[]>((resolve, reject) => {
      projectAxios
        .get(`/gantt`, {
          params: {
            start,
            end,
            op,
            projectId,
            userId,
          },
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * @description
   * 해당 프로젝트에 간트/캘린더와 매핑한 이슈를 생성합니다.
   *
   * @author bell
   */
  postCreateGantt: async (
    issueCode: string,
    issueSummary: string,
    projectId: number,
    userId: number,
    startTime: string,
    endTime: string,
    progress?: number,
    version?: number,
  ) => {
    try {
      await projectAxios.post('/gantt', {
        issueCode,
        issueSummary,
        projectId,
        userId,
        startTime,
        endTime,
        progress,
        version,
      });
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * @description
   * 해당 프로젝트에 간트/캘린더의 이슈 내용을 수정합니다
   *
   * @author bell
   */
  updateGantt: async (
    id: number,
    issueCode?: string,
    issueSummary?: string,
    userId?: number,
    startTime?: string,
    endTime?: string,
    progress?: number,
  ) => {
    try {
      await projectAxios.put('/gantt', {
        id,
        issueCode,
        issueSummary,
        userId,
        startTime,
        endTime,
        progress,
      });
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * @description
   * db에 저장된 해당 프로젝트의 이슈를 삭제합니다.
   *
   */
  deleteGantt: async (ganttChartId: number) => {
    try {
      await projectAxios.delete(`/gantt/${ganttChartId}`);
    } catch (e) {
      console.log(e);
    }
  },
};
