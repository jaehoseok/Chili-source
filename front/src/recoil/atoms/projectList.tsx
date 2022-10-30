import { atom } from 'recoil';

export interface widgetType {
  isActivated: boolean;
  title: string;
}

export interface tabType extends widgetType {
  id: number;
  widgetList: widgetType[];
}

// 테스트용 삭제용 더미 데이터
const CHILISOURCE = {
  id: 1,
  isActivated: false,
  title: '칠리소스',
  widgetList: [
    {
      isActivated: true,
      title: 'dashboard',
    },
  ],
};

const APICLOUD = {
  id: 2,
  isActivated: false,
  title: 'API cloud',
  widgetList: [
    {
      isActivated: true,
      title: 'dashboard',
    },
  ],
};

const MOTOO = {
  id: 3,
  isActivated: false,
  title: '모투',
  widgetList: [
    {
      isActivated: true,
      title: 'dashboard',
    },
  ],
};

const FOODTRUCK = {
  id: 4,
  isActivated: false,
  title: '푸드트럭 서비스',
  widgetList: [
    {
      isActivated: true,
      title: 'dashboard',
    },
  ],
};

CHILISOURCE.isActivated = true;

export const tabListState = atom<tabType[]>({
  key: 'tabList',
  default: [CHILISOURCE, APICLOUD, MOTOO, FOODTRUCK],
});
