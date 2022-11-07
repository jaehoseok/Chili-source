import { memo } from 'react';

import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';

import { useRecoilState } from 'recoil';
import { tabListState, tabType, widgetType } from '../../../../recoil/atoms/projectList';

import NavProject from 'components/molecules/NavProject';
import NavWidget from 'components/molecules/NavWidget';
import Tab from 'components/atoms/Tab';

/**
 *
 * @description
 * navProject 컴포넌트와, navWidget 컴포넌트 및 프로젝트 데이터를 관리하는 common 컴포넌트
 * 탭마다 경로 이동이 이루어지기 떄문에 recoil을 통해 상태관리 데이터르 관리한다.
 *
 * @author bell
 */
const index = memo(() => {
  // project용 recoil 데이터 가져오기, set 적용하기

  const [tabList, setTabList] = useRecoilState<tabType[]>(tabListState);

  const navigate = useNavigate();

  const el = document.getElementById('nav-root');

  // 프로젝트 탭을 활성화시키는 함수
  // 해당 Tab이 활성화 되는 경우, 다른 Tab은 활성화가 종료 되며,
  // 활성화 된 컴포넌트에 맞게 경로가 이동되어야 한다.
  // 프로젝트 데이터가 없는 경우는 ProjectSelectPage로 이동한다.
  const activateToggleHandler = (id: number, isActivated: boolean) => {
    let idx = -1;
    setTabList((prevArr: tabType[]) => {
      if (prevArr.length <= 0) navigate('/projects');

      // 데이터 복사
      // recoil은 primitive 데이터 외에는 모두 읽기전용으로만 가져오기 떄문에,
      // 복사시 설정 주의할것!
      const newTabs = prevArr.map(({ id, isActivated, title, widgetList }: tabType) => {
        return {
          id,
          isActivated,
          title,
          widgetList,
        };
      });

      // 복사한 데이터의 isActivated를 모두 false로
      newTabs.forEach((newTab: tabType) => (newTab.isActivated = false));

      // 활성화 시킬 idx 찾기
      idx = newTabs.findIndex(newTab => newTab.id === id);
      // 경로 이동을 위한, id룰 확인
      let currId: number;
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
      navigate(`/project/${currId}/dashboard`);
      return newTabs;
    });
    activatedToggleWidgetHandler(idx, '대시보드', false);
  };

  // 해당 프로젝트 탭을 삭제하는 함수
  const closeTabHandler = (id: number) => {
    setTabList((prevArr: tabType[]) => {
      const newTabs = [...prevArr];
      // 필터링을 통해, 해당 id를 제외한
      // 새 프로젝트 데이터를 반환하다.
      return newTabs.filter(tab => tab.id !== id);
    });
  };

  // 위젯 탭을 활성화, 비활성화시키는 함수
  // 설계 방식은 actiavatedToggleHandler와 동일하나, 내부에 속해있는 widgetList[] 를 업데이트 해주는 함수이다.
  const activatedToggleWidgetHandler = (
    projectIdx: number, // 현재 projectList 중 해당 project의 idx값
    title: string, // 현재 위젯 탭의 title 값
    isActivated: boolean, // 현재 위젯 탭의 활성화 여부
  ) => {
    // projectIdx가 -1이 들어올 수 있다. (이미 데이터가 삭제되고 프로젝트 데이터가 없는 경우)
    // 그러한 경우에는 업데이트 할게 없으니 그냥 리턴 하면 된다.
    if (projectIdx < 0) return;
    setTabList((prevArr: tabType[]) => {
      // 현재 수정이 이루어져야 하는 widgetList
      const currWidgetList = prevArr[projectIdx].widgetList;
      // 실제 프로젝트의 id값
      // 이후 경로 이동에 필요하다.
      const projectId = prevArr[projectIdx].id;
      // widgetList 안의 현재 widget의 idx 값
      const idx: number = currWidgetList.findIndex(widget => widget.title === title);

      // 배열 복제
      const newTabs = prevArr.map(({ id, isActivated, title, widgetList }: tabType) => {
        return {
          id,
          isActivated,
          title,
          widgetList,
        };
      });

      // 위젯 복제
      // 위젯도 배열이기에, 복제를 하지 않으면 수정이 불가능하다.
      const newWidgets: widgetType[] = currWidgetList.map(({ title, isActivated }: widgetType) => {
        return {
          title,
          isActivated,
        };
      });

      // 해당 프로젝트의 모든 위젯의 활성화 여부를 모두 false로
      newWidgets.forEach(widget => (widget.isActivated = false));

      let currTitle: string;
      try {
        if (idx === -1 && isActivated) {
          newWidgets[0].isActivated = !newWidgets[0].isActivated;
          currTitle = newWidgets[0].title;
        } else {
          newWidgets[idx].isActivated = !newWidgets[idx].isActivated;
          currTitle = newWidgets[idx].title;
        }
      } catch (e) {
        return prevArr;
      }

      newTabs[projectIdx].widgetList = [...newWidgets];

      // 확인된 currTitle 값을 토대로, 경로 이동
      // 고유의 id값을 지정할까 생각했지만
      // 서비스에서 나타날 수 있는 경우의 수가 4개뿐이라
      // 그냥 title로 확인함
      switch (currTitle) {
        case '대시보드':
          navigate(`/project/${projectId}/dashboard`);
          break;
        case '이슈':
          navigate(`/project/${projectId}/issues`);
          break;
        case `캘린더`:
          navigate(`/project/${projectId}/calendar`);
          break;
        case '간트차트':
          navigate(`/project/${projectId}/gantt-chart`);
          break;
      }
      return newTabs;
    });
  };

  // 위젯 탭을 삭제하는 함수
  const closeWidgetHandler = (projectIdx: number, title: string) => {
    setTabList((prevArr: tabType[]) => {
      const currWidgetList = prevArr[projectIdx].widgetList;

      // 결과적으로 이중 배열의 형태이기 때문에
      // 한번의 복제를 해야한다.
      const newTabs = prevArr.map(({ id, isActivated, title, widgetList }: tabType) => {
        return {
          id,
          isActivated,
          title,
          widgetList,
        };
      });

      const newWidgets: widgetType[] = currWidgetList.filter(
        (widget: widgetType) => widget.title !== title,
      );

      // 해당 프로젝트의 widgetList에
      // 수정 값을 반영
      newTabs[projectIdx].widgetList = [...newWidgets];

      // 수정환 newTabs를 반환
      return newTabs;
    });
  };

  return createPortal(
    <>
      <NavProject>
        {tabList.map(({ isActivated, title, id }: tabType, idx: number) => (
          <Tab
            key={idx}
            type={'project'}
            isActivated={isActivated}
            title={title}
            toggleHandler={activateToggleHandler.bind(null, id, isActivated)}
            closeHandler={closeTabHandler.bind(null, id)}
            xBtn={true}
          ></Tab>
        ))}
        <Tab
          key={99999}
          type={'project'}
          isActivated={false}
          title={'+'}
          plus={true}
          xBtn={false}
        ></Tab>
      </NavProject>
      <NavWidget>
        {tabList.map(
          ({ isActivated, widgetList }: tabType, projectIdx: number) =>
            isActivated &&
            widgetList.map(({ isActivated, title }: widgetType, idx: number) => (
              <Tab
                key={idx}
                type={'widget'}
                isActivated={isActivated}
                title={title}
                toggleHandler={activatedToggleWidgetHandler.bind(
                  null,
                  projectIdx,
                  title,
                  isActivated,
                )}
                closeHandler={closeWidgetHandler.bind(null, projectIdx, title)}
                xBtn={true}
              ></Tab>
            )),
        )}
        <Tab
          classname="sd"
          key={99999}
          type={'widget'}
          isActivated={false}
          title={'+'}
          plus={true}
          xBtn={false}
        ></Tab>
      </NavWidget>
    </>,
    el as HTMLElement,
  );
});

export default index;
