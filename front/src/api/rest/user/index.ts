// API & Library
import { createAxiosApi } from 'api/axios';

// Init
const userAxios = createAxiosApi('user-service');

/**
 * @description
 * http://k7b2071.p.ssafy.io/user-service/ 이하의 url의 요청을 보낼 프라미스 객체를 리턴하는 함수들
 *
 * @example
 * ```
 * // rest 라이브러리 임포트
 * import { user } from 'api/rest'
 *
 * // IFFE 방식 또는 프라미스 객체를 활용하는 어떤 방법이던 상관없음
 * ( async () => {const tokenCodes = await user.getTokenCodes} )();
 * ```
 *
 * @author inte
 */
export default {
  /**
   * @description user 서버의 token code 들을 받아옴
   *
   * @author inte
   */
  getTokenCodes: () => {
    return new Promise((resolve, reject) => {
      userAxios
        .get(`/token-codes`)
        .then(response => {
          console.log(response);
          resolve(response);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

  /**
   * @description
   * user-service의 로그인 한 유저의 데이터를 가져옴
   *
   * @author bell
   */
  getUserInfo: async () => {
    // 개인적 견해 - bell
    // 리액트 쿼리와 함께 적용하는 경우, Promise 데이터로는 타입 정하기가 쉽지않다.
    // Promise는 resolve, reject 등 각각 두가지 형태의 타입을 가질 수 있는데
    // 각각 resolve는 Promise<unknown> reject는 AxiosError를 타입으로 가질 수 있다.
    // 문제는 Promise<unknown> 타입이 어떤게 나올지 모르기에, 타입스크립트에서 에러를 엄청 날린다. (한 9개 날리더라)
    // 그렇다면 타입을 확정하기 간편하도록 성공시의 데이터 자체를 반환하면
    // 리턴 값을 interface화 하여 타입을 설정하기 한결 쉬워지는 듯 하다.
    try {
      const response = await userAxios.get('/users/info');
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
};
