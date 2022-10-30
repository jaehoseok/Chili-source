import { atom } from 'recoil';

// 테스트용 위젯 더미 데이터

const DASHBOARD = {
  title: 'dashboard',
  isActivated: false,
};

export interface widgetType {
  title: string;
  isActivated: boolean;
}

export const widgetListState = atom<widgetType[]>({
  key: 'widgetList',
  default: [DASHBOARD],
});
