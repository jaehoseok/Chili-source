import { atom } from 'recoil';

export interface tabType {
  id: number;
  isActivated: boolean;
  title: string;
}

export const tabListState = atom<tabType[]>({
  key: 'tabList',
  default: [],
});
