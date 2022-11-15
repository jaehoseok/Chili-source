import { atom } from 'recoil';

/**
 * @description
 * /auth-service/tokens (POST)
 * 토큰을 연동하는 데 필요한 requestBody값을 저장하는 recoil 코드
 *
 * @author bell
 */
export const linkageTokenState = atom({
  key: 'linkageToken',
  default: {
    jiraToken: '',
    jiraEmail: '',
    gitLabToken: '',
  },
});
