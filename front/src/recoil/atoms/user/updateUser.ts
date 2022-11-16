import { atom } from 'recoil';

/**
 * @description
 * /user-service/user
 * 유저 설정 페이지에서 유저 데이터를 바꾸는데 필요한 데이터를 상태관리
 *
 * @author bell
 */
export const updateUserState = atom({
  key: 'updateUser',
  default: {
    userName: '',
    myJiraToken: '',
    myJiraEmail: '',
    myGitLabToken: '',
  },
});
