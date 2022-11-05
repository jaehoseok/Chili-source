import { atom } from 'recoil';

export const state = atom({
  key: 'linkageToken',
  default: {
    jiraToken: '',
    gitToken: '',
  },
});
