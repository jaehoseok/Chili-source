import { atom } from 'recoil';

/**
 * @description
 * /project-service/project (POST)
 * 프로젝트를 생성하는 데 필요한 image 및 requestBody 값을
 * 저장하는 recoil 코드
 *
 * @author bell
 */
export const createProjectState = atom({
  key: 'createProject',
  default: {
    projectName: '',
    projectDescription: '',
    projectImage: null || '',
  },
});
