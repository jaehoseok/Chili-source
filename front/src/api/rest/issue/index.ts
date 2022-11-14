// API & Library
import { createAxiosApi } from 'api/axios';
import { templateType } from 'components/pages/IssuesPage';
// Init
const issueAxios = createAxiosApi('issue-service');

/**
 * @description
 * http://k7b2071.p.ssafy.io/issue-service/ 이하의 url의 요청을 보낼 프라미스 객체를 리턴하는 함수들
 *
 * @example
 * ```
 * // rest 라이브러리 임포트
 * import { issue } from 'api/rest'
 *
 * // IFFE 방식 또는 프라미스 객체를 활용하는 어떤 방법이던 상관없음
 * ( async () => {const tokenCodes = await issue.getTokenCodes} )();
 * ```
 *
 * @author inte
 */
export default {
  /**
   * @description issue 서버의 token code 들을 받아옴
   *
   * @author inte
   */
  getTokenCodes: () => {
    return new Promise((resolve, reject) => {
      issueAxios
        .get(`/token-codes`)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * @description
   * 가지고 있는 지라 토큰을 통해
   * 지라의 모든 프로젝트를 알려주는 API
   *
   * @author bell
   */
  getJiraProjectList: async () => {
    try {
      const response = await issueAxios.get('/jira/project-list');
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  /**
   * @description
   * 이슈 템플릿 조회 API
   * 자신이 작성한 이슈 템플릿 리스트를 조회한다.
   *
   * @author dbcs
   */
  getIssueTemplateList: async (projectId: number) => {
    try {
      const response = await issueAxios.get('/', {
        params: {
          projectId: projectId,
          me: true,
        },
      });
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  /**
   * @description
   * 이슈 템플릿 생성 API
   * 현 프로젝트 내에 자신의 이슈 템플릿을 생성한다.
   *
   * @author dbcs
   */
  postCreateIssueTemplate: async (
    projectId: number,
    issueType: string,
    summary: string,
    description: string,
    assignee: string,
    priority: string,
    epicLink: string,
    sprint: number,
    storyPoints: number,
  ) => {
    try {
      interface responseType {
        projectId: number;
        issueType: string;
        summary: string;
        description: string;
        assignee: string;
        priority: string;
        epicLink: string;
        storyPoints: number;
      }
      const data = {
        projectId,
        issueType,
        summary,
        description,
        assignee,
        priority,
        epicLink,
        sprint,
        storyPoints,
      };
      const response = await issueAxios.post('/', data);
      console.log(response);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  putEditIssueTemplate: async (
    projectId: number,
    issueType: string,
    summary: string,
    description: string,
    assignee: string,
    priority: string,
    epicLink: string,
    storyPoints: number,
    issueTemplateId: number,
  ) => {
    try {
      const data = {
        projectId,
        issueType,
        summary,
        description,
        assignee,
        priority,
        epicLink,
        storyPoints,
      };
      const response = issueAxios.put(`/${issueTemplateId}`, data);
      console.log(response);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  deleteIssueTemplate: async (issueTemplateId: number) => {
    try {
      const response = issueAxios.delete(`/${issueTemplateId}`);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  getEpicList: async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  },
  getSprintList: async (projectId: number) => {
    try {
    } catch (e) {
      console.log(e);
    }
  },
};
