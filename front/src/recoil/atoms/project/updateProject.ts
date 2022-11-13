import { atom } from 'recoil';

/**
 * @description
 * /project-service/project (POST)
 * 기존의 프로젝트 데이터를 업데이트하는 requestBody 값을
 * 저장하는 recoil 코드
 *
 * @author bell
 */
export const updateProjectState = atom({
  key: 'updateProject',
  default: {
    projectName: '',
    projectDescription: '',
    projectImage: null || '',
    projectInviteUser: '',
  },
});
