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

const HeaderNav = () => {
  const [tabList, setTabList] = useRecoilState(tabListState);

  useEffect(() => {
    setTabList([CHILISOURCE, APICLOUD, MOTOO]);
  }, []);

  const activateToggleHandler = (idx: number) => {
    setTabList(prevArr => {
      const newTabs = prevArr.map(({ id, isActivated, title }) => {
        return {
          id,
          isActivated,
          title,
        };
      });
      newTabs.forEach(newTab => (newTab.isActivated = false));
      try {
        newTabs[idx].isActivated = !newTabs[idx].isActivated;
      } catch (e) {
        console.log('현재 tab값', newTabs, '\n', '현재 idx', idx);
        // 재 렌더링 idx 값이 계속 남아있는 문제 발생
        if (newTabs.length <= idx) idx--;
        if (idx < 0) idx++;
        newTabs[idx].isActivated = !newTabs[idx].isActivated;
      } finally {
        return newTabs;
      }
    });
  };

  const closeTabHandler = (id: number) => {
    setTabList(prevArr => {
      const newTabs = [...prevArr];
      return newTabs.filter(tab => tab.id !== id);
    });
  };

  return (
    <NavProject>
      {tabList.map(({ isActivated, title, id }, idx) => (
        <Tab
          key={idx}
          isActivated={isActivated}
          title={title}
          toggleHandler={activateToggleHandler.bind('', idx)}
          closeHandler={closeTabHandler.bind('', id)}
        ></Tab>
      ))}
    </NavProject>
  );
};

export default HeaderNav;
