import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tabListState, tabType } from './recoil/atoms/projectList';

import NavProject from './components/molecules/NavProject';
import Tab from './components/atoms/Tab';

// 테스트용 삭제용 더미 데이터
const CHILISOURCE = {
  id: 1,
  isActivated: true,
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

const HeaderNav = () => {
  const [tabList, setTabList] = useRecoilState<tabType[]>(tabListState);
  const navigate = useNavigate();

  useEffect(() => {
    setTabList([CHILISOURCE, APICLOUD, MOTOO, FOODTRUCK]);
  }, []);

  const activateToggleHandler = (id: number, isActivated: boolean) => {
    setTabList((prevArr: tabType[]) => {
      if (prevArr.length <= 0) navigate('/projects');

      const newTabs = prevArr.map(({ id, isActivated, title }: tabType) => {
        return {
          id,
          isActivated,
          title,
        };
      });
      newTabs.forEach((newTab: tabType) => (newTab.isActivated = false));
      const idx = newTabs.findIndex(newTab => newTab.id === id);
      let currId;
      try {
        if (idx === -1 && isActivated) {
          newTabs[0].isActivated = !newTabs[0].isActivated;
          currId = newTabs[0].id;
        } else {
          newTabs[idx].isActivated = !newTabs[idx].isActivated;
          currId = newTabs[idx].id;
        }
      } catch (e) {
        return prevArr;
      }
      navigate(`/projects/${currId}`);
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
