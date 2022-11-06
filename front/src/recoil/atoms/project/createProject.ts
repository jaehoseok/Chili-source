import { atom } from 'recoil';

export const createProjectState = atom({
  key: 'createProject',
  default: {
    projectName: '',
    projectDescription: '',
    projectImage: null || '',
  },
});
