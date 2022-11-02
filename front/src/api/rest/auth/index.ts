// API & Library
// import { useLocation } from 'react-router-dom';
import { createAxiosApi, setAccessToken } from 'api/axios';

export const authAxios = createAxiosApi('auth-service');

/**
 * @description
 * http://k7b2071.p.ssafy.io/auth-service/ 이하의 url의 요청을 보낼 프라미스 객체를 리턴하는 함수들
 *
 * @author inte
 */
export default {
  /**
   * @description 로그인 페이지로 즉시 이동
   * @example
   * ```typescript
   * () => { auth.login(google) }
   * ```
   * @params {string?} socialLoginType - 로그인 타입
   * @returns
   * @author inte
   */
  login: (socialLoginType: string) => {
    console.log('[로그인 시도] : ', socialLoginType);
    console.log('[이전 주소 저장]', location.pathname);
    localStorage.setItem('URL', location.pathname);
    console.log(authAxios.defaults.baseURL);
    location.href = `${authAxios.defaults.baseURL}/login/${socialLoginType}`;
    return;
  },

  logout: () => {
    console.log('[로그아웃 시도]');
    localStorage.removeItem('URL');
    localStorage.removeItem('Authorization');
    location.href = `/`;
    return;
  },

  /**
   * @description 서버에 로그인의 콜백함수를 호출 Access token 요청
   * @params {string?} code - 구글 소셜 로그인 코드
   * @returns {number} ACCESS_TOKEN - 헤더에 담긴 엑세스 토큰
   * @author inte
   */
  loginCallback: (socialLoginType: string, code: string) => {
    return new Promise((resolve, reject) => {
      authAxios
        .get(`/login/${socialLoginType}/callback?code=${code}`)
        .then(response => {
          const ACCESS_TOKEN = response.headers['authorization'];
          console.log('[받아온 토큰] : ', response.headers['authorization']);
          setAccessToken(ACCESS_TOKEN);
          localStorage.setItem('Authorization', ACCESS_TOKEN || '');
          resolve(ACCESS_TOKEN);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  tokenRefresh: () => {
    return new Promise((resolve, reject) => {
      authAxios
        .get('/refresh')
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * @description 서버의 token code 들을 받아옴
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

  getTokens: () => {
    return new Promise((resolve, reject) => {
      authAxios
        .get(`/tokens`)
        .then(response => {
          console.log('일단은 토큰스', response);
          resolve(response);
        })
        .catch(error => {
          console.log('error');
          reject(error);
        });
    });
  },
};
