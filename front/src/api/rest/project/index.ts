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
   * @description project 서버의 token code 들을 받아옴
   *
   * @author inte
   */
  getTokenCodes: () => {
    return new Promise((resolve, reject) => {
      projectAxios
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
   * 해당 유저가 가지고 있는 토큰과 연동되는 모든 우리 서비스의 프로젝트들을 주는 API
   *
   * @author bell
   */
  getProjectWithToken: async () => {
    try {
      const response = await projectAxios.get('/project');
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * @description
   * 프로젝트를 생성하는 API
   *
   * @param {string}                              name           - 프로젝트의 이름
   * @param {string}                              description    - 프로젝트의 상세 내용
   * @param {ChangeEvent<HTMLInputElement>}       image          - file input의 ChangeEvent가 가지고 있는 데이터
   * @author bell
   */
  postCreateProject: async (
    name: string,
    description: string,
    image: ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const formData = new FormData();
      const data = {
        description,
        name,
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      if (image) formData.append('image', image.target.files[0]);
      formData.append('request', new Blob([JSON.stringify(data)], { type: 'application/json' }));
      const response = await projectAxios.post('/project', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
};
