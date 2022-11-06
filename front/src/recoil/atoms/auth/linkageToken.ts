import { atom } from 'recoil';

export const linkageTokenState = atom({
  key: 'linkageToken',
  default: {
    jiraToken: '',
    gitToken: '',
  },
});
