import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tabListState, tabType } from './recoil/atoms/projectList';

import NavProject from './components/molecules/NavProject';
import Tab from './components/atoms/Tab';

/**
 *
 * @description
 * navProject 컴포넌트와, navWidget 컴포넌트 및 프로젝트 데이터를 관리하는 common 컴포넌트
 * 탭마다 경로 이동이 이루어지기 떄문에 recoil을 통해 상태관리 데이터르 관리한다.
 *
 * @author bell
 */
const HeaderNav = () => {
  // recoil 데이터 가져오기, set 적용하기
  const [tabList, setTabList] = useRecoilState<tabType[]>(tabListState);
  const navigate = useNavigate();

  // 탭을 활성화시키는 함수
  // 해당 Tab이 활성화 되는 경우, 다른 Tab은 활성화가 종료 되며,
  // 활성화 된 컴포넌트에 맞게 경로가 이동되어야 한다.
  // 프로젝트 데이터가 없는 경우는 ProjectSelectPage로 이동한다.
  const activateToggleHandler = (id: number, isActivated: boolean) => {
    setTabList((prevArr: tabType[]) => {
      if (prevArr.length <= 0) navigate('/projects');

      // 데이터 복사
      // recoil은 primitive 데이터 외에는 모두 읽기전용으로만 가져오기 떄문에,
      // 복사시 설정 주의할것!
      const newTabs = prevArr.map(({ id, isActivated, title }: tabType) => {
        return {
          id,
          isActivated,
          title,
        };
      });

      // 복사한 데이터의 isActivated를 모두 false로
      newTabs.forEach((newTab: tabType) => (newTab.isActivated = false));

      // 활성화 시킬 idx 찾기
      const idx = newTabs.findIndex(newTab => newTab.id === id);
      // 경로 이동을 위한, id룰 확인
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
        // 삭제된 이전 데이터때문에 배열의 갯수와 idx 맞지 않아 indexError가 나오는 경우가 았다.
        // 필요없는 값은 삭제되었을테니, 활성화된 탭이 존재하는
        // 이전의 값을 반환하는 것으로, 에러를 해결하였다.
        return prevArr;
      }
      // 해당 id값을 토대로 경로 이동
      navigate(`/projects/${currId}`);
      return newTabs;
    });
  };

  // 해당 탭을 삭제하는 함수
  const closeTabHandler = (id: number) => {
    setTabList((prevArr: tabType[]) => {
      const newTabs = [...prevArr];
      // 필터링을 통해, 해당 id를 제외한
      // 새 프로젝트 데이터를 반환하다.
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
