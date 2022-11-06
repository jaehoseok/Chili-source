// API & Library
import { createAxiosApi } from 'api/axios';

// Init
const authAxios = createAxiosApi('project-service');

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
   * @description project 서버의 token code 들을 받아옴
   *
   * @author inte
   */
  getTokenCodes: () => {
    return new Promise((resolve, reject) => {
      authAxios
        .get(`/token-codes`)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getProjectWithToken: async () => {
    try {
      const response = await authAxios.get('/project');
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
};
