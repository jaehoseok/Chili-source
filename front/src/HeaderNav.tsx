import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { tabListState, tabType } from './recoil/atoms/projectList';

import NavProject from './components/molecules/NavProject';
import Tab from './components/atoms/Tab';

// 테스트용 삭제용 더미 데이터
const CHILISOURCE = {
  id: 12382,
  isActivated: true,
  title: '칠리소스',
};

const APICLOUD = {
  id: 12387,
  isActivated: false,
  title: 'API cloud',
};

const MOTOO = {
  id: 12820,
  isActivated: false,
  title: '모투',
};

const ABC = {
  id: 12826,
  isActivated: false,
  title: 'ABCDEFU',
};

const HeaderNav = () => {
  const [tabList, setTabList] = useRecoilState<tabType[]>(tabListState);

  useEffect(() => {
    setTabList([CHILISOURCE, APICLOUD, MOTOO, ABC]);
  }, []);

  const activateToggleHandler = (id: number, isActivated: boolean) => {
    setTabList((prevArr: tabType[]) => {
      const newTabs = prevArr.map(({ id, isActivated, title }: tabType) => {
        return {
          id,
          isActivated,
          title,
        };
      });
      newTabs.forEach((newTab: tabType) => (newTab.isActivated = false));
      const idx = newTabs.findIndex(newTab => newTab.id === id);
      try {
        if (idx === -1 && isActivated) {
          newTabs[0].isActivated = !newTabs[0].isActivated;
        } else {
          newTabs[idx].isActivated = !newTabs[idx].isActivated;
        }
      } catch (e) {
        return prevArr;
      }
      return newTabs;
    });
  };

  const closeTabHandler = (id: number) => {
    setTabList((prevArr: tabType[]) => {
      const newTabs = [...prevArr];
      return newTabs.filter(tab => tab.id !== id);
    });
  };

  return (
    <NavProject>
      {tabList.map(({ isActivated, title, id }: tabType, idx: number) => (
        <Tab
          key={idx}
          isActivated={isActivated}
          title={title}
          toggleHandler={activateToggleHandler.bind('', id, isActivated)}
          closeHandler={closeTabHandler.bind('', id)}
        ></Tab>
      ))}
    </NavProject>
  );
};

export default HeaderNav;
