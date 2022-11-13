// API & Library
import { createAxiosApi } from 'api/axios';

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
};