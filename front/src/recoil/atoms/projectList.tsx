import { atom } from 'recoil';

// 테스트용 삭제용 더미 데이터
const CHILISOURCE = {
  id: 1,
  isActivated: false,
  title: '칠리소스',
};

const APICLOUD = {
  id: 2,
  isActivated: false,
  title: 'API cloud',
};

const MOTOO = {
  id: 3,
  isActivated: false,
  title: '모투',
};

const FOODTRUCK = {
  id: 4,
  isActivated: false,
  title: '푸드트럭 서비스',
};

export interface tabType {
  id: number;
  isActivated: boolean;
  title: string;
}

CHILISOURCE.isActivated = true;

export const tabListState = atom<tabType[]>({
  key: 'tabList',
  default: [CHILISOURCE, APICLOUD, MOTOO, FOODTRUCK],
});
