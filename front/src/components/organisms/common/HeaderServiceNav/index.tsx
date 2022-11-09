import { memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';

// import { useRecoilState } from 'recoil';
// import { tabListState, tabType, widgetType } from '../../../../recoil/atoms/projectList';

import NavProject from 'components/molecules/NavProject';
import NavWidget from 'components/molecules/NavWidget';
import Tab from 'components/atoms/Tab';
import { useGetProject } from 'hooks/project';

interface widgetType {
  isActivated: boolean;
  title: string;
}

interface tabType {
  id: number;
  widgetList: widgetType[];
  title: string;
  isActivated: boolean;
}

// const CHILISOURCE = {
//   id: 1,
//   isActivated: false,
//   title: '칠리소스',
//   widgetList: [
//     {
//       isActivated: true,
//       title: '대시보드',
//     },
//     {
//       isActivated: false,
//       title: '캘린더',
//     },
//     {
//       isActivated: false,
//       title: '간트차트',
//     },
//     {
//       isActivated: false,
//       title: '이슈',
//     },
//   ],
// };

// const APICLOUD = {
//   id: 2,
//   isActivated: false,
//   title: 'API cloud',
//   widgetList: [
//     {
//       isActivated: true,
//       title: '대시보드',
//     },
//   ],
// };

// const MOTOO = {
//   id: 3,
//   isActivated: false,
//   title: '모투',
//   widgetList: [
//     {
//       isActivated: true,
//       title: '대시보드',
//     },
//   ],
// };

// const FOODTRUCK = {
//   id: 4,
//   isActivated: false,
//   title: '푸드트럭 서비스!',
//   widgetList: [
//     {
//       isActivated: true,
//       title: '대시보드',
//     },
//   ],
// };

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

  // const [tabList, setTabList] = useRecoilState<tabType[]>(tabListState);
  // let projectTabList: tabType[];

  // portal 용
  const el = document.getElementById('nav-root');

  const navigate = useNavigate();
  const location = useLocation();
  const currProjectId = location.pathname.split('/')[2];

  // 쿼리 데이터
  const getProject = useGetProject(+currProjectId);

  const GETTABPROJECT = localStorage.getItem('project-tab-list');
  if (!GETTABPROJECT) {
    localStorage.setItem(
      'project-tab-list',
      JSON.stringify([
        {
          id: +currProjectId,
          isActivated: true,
          title: getProject.data && getProject.data.name,
          widgetList: [{ isActivated: true, title: '대시보드' }],
        },
      ]),
    );
  }

  let projectTabList: tabType[] = JSON.parse(GETTABPROJECT as string);

  useEffect(() => {
    console.log('리렌더링');
  }, [projectTabList]);

  // 프로젝트 탭을 활성화시키는 함수
  // 해당 Tab이 활성화 되는 경우, 다른 Tab은 활성화가 종료 되며,
  // 활성화 된 컴포넌트에 맞게 경로가 이동되어야 한다.
  // 프로젝트 데이터가 없는 경우는 ProjectSelectPage로 이동한다.
  const activateToggleHandler = (id: number, isActivated: boolean) => {
    console.log('토글됨');
    let idx = -1;

    if (projectTabList.length <= 0) navigate('/projects');

    projectTabList.forEach((projectTab: tabType) => {
      projectTab.isActivated = false;
    });

    const newTabs = projectTabList.map(({ id, isActivated, title, widgetList }: tabType) => {
      return {
        id,
        isActivated,
        title,
        widgetList,
      };
    });

    idx = newTabs.findIndex(projectTab => projectTab.id === id);
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
      return projectTabList;
    }
    navigate(`/project/${currId}/dashboard`);
    activatedToggleWidgetHandler(idx, '대시보드', false);
    localStorage.setItem('project-tab-list', JSON.stringify(newTabs));
    projectTabList = JSON.parse(localStorage.getItem('project-tab-list') as string);
    // if(GETTABPROJECT?.length < 0)
    // setTabList((prevArr: tabType[]) => {
    //   if (prevArr.length <= 0) navigate('/projects');

    //   // 데이터 복사
    //   // recoil은 primitive 데이터 외에는 모두 읽기전용으로만 가져오기 떄문에,
    //   // 복사시 설정 주의할것!
    //   const newTabs = prevArr.map(({ id, isActivated, title, widgetList }: tabType) => {
    //     return {
    //       id,
    //       isActivated,
    //       title,
    //       widgetList,
    //     };
    //   });

    //   // 복사한 데이터의 isActivated를 모두 false로
    //   newTabs.forEach((newTab: tabType) => (newTab.isActivated = false));

    //   // 활성화 시킬 idx 찾기
    //   idx = newTabs.findIndex(newTab => newTab.id === id);
    //   // 경로 이동을 위한, id룰 확인
    //   let currId: number;
    //   try {
    //     if (idx === -1 && isActivated) {
    //       newTabs[0].isActivated = !newTabs[0].isActivated;
    //       currId = newTabs[0].id;
    //     } else {
    //       newTabs[idx].isActivated = !newTabs[idx].isActivated;
    //       currId = newTabs[idx].id;
    //     }
    //   } catch (e) {
    //     // 삭제된 이전 데이터때문에 배열의 갯수와 idx 맞지 않아 indexError가 나오는 경우가 았다.
    //     // 필요없는 값은 삭제되었을테니, 활성화된 탭이 존재하는
    //     // 이전의 값을 반환하는 것으로, 에러를 해결하였다.
    //     return prevArr;
    //   }
    //   // 해당 id값을 토대로 경로 이동
    //   navigate(`/project/${currId}/dashboard`);
    //   return newTabs;
    // });
    // activatedToggleWidgetHandler(idx, '대시보드', false);
  };

  // 해당 프로젝트 탭을 삭제하는 함수
  const closeTabHandler = (id: number) => {
    const newTabs = [...projectTabList];
    // console.log(newTabs);

    localStorage.setItem('project-tab-list', JSON.stringify(newTabs.filter(tab => tab.id !== id)));
    projectTabList = JSON.parse(localStorage.getItem('project-tab-list') as string);

    // setTabList((prevArr: tabType[]) => {
    //   const newTabs = [...prevArr];
    //   // 필터링을 통해, 해당 id를 제외한
    //   // 새 프로젝트 데이터를 반환하다.
    //   return newTabs.filter(tab => tab.id !== id);
    // });
  };

  // 위젯 탭을 활성화, 비활성화시키는 함수
  // 설계 방식은 actiavatedToggleHandler와 동일하나, 내부에 속해있는 widgetList[] 를 업데이트 해주는 함수이다.
  const activatedToggleWidgetHandler = (
    projectIdx: number, // 현재 projectList 중 해당 project의 idx값
    title: string, // 현재 위젯 탭의 title 값
    isActivated: boolean, // 현재 위젯 탭의 활성화 여부
  ) => {
    if (projectIdx < 0) return;
    const widgetTabList = projectTabList[projectIdx].widgetList;
    const projectId = projectTabList[projectIdx].id;

    const idx = widgetTabList.findIndex(widget => widget.title === title);

    const newTabs = projectTabList.map(({ id, isActivated, title, widgetList }: tabType) => {
      return { id, isActivated, title, widgetList };
    });

    const newWidgets = widgetTabList.map(({ title, isActivated }: widgetType) => {
      return {
        title,
        isActivated,
      };
    });

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
      return projectTabList;
    }

    newTabs[projectIdx].widgetList = [...newWidgets];

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
    localStorage.setItem('project-tab-list', JSON.stringify(newTabs));
    projectTabList = JSON.parse(localStorage.getItem('project-tab-list') as string);

    // projectIdx가 -1이 들어올 수 있다. (이미 데이터가 삭제되고 프로젝트 데이터가 없는 경우)
    // 그러한 경우에는 업데이트 할게 없으니 그냥 리턴 하면 된다.
    // if (projectIdx < 0) return;
    // setTabList((prevArr: tabType[]) => {
    //   // 현재 수정이 이루어져야 하는 widgetList
    //   const currWidgetList = prevArr[projectIdx].widgetList;
    //   // 실제 프로젝트의 id값
    //   // 이후 경로 이동에 필요하다.
    //   const projectId = prevArr[projectIdx].id;
    //   // widgetList 안의 현재 widget의 idx 값
    //   const idx: number = currWidgetList.findIndex(widget => widget.title === title);
    //   // 배열 복제
    //   const newTabs = prevArr.map(({ id, isActivated, title, widgetList }: tabType) => {
    //     return {
    //       id,
    //       isActivated,
    //       title,
    //       widgetList,
    //     };
    //   });
    //   // 위젯 복제
    //   // 위젯도 배열이기에, 복제를 하지 않으면 수정이 불가능하다.
    //   const newWidgets: widgetType[] = currWidgetList.map(({ title, isActivated }: widgetType) => {
    //     return {
    //       title,
    //       isActivated,
    //     };
    //   });
    //   // 해당 프로젝트의 모든 위젯의 활성화 여부를 모두 false로
    //   newWidgets.forEach(widget => (widget.isActivated = false));
    //   let currTitle: string;
    //   try {
    //     if (idx === -1 && isActivated) {
    //       newWidgets[0].isActivated = !newWidgets[0].isActivated;
    //       currTitle = newWidgets[0].title;
    //     } else {
    //       newWidgets[idx].isActivated = !newWidgets[idx].isActivated;
    //       currTitle = newWidgets[idx].title;
    //     }
    //   } catch (e) {
    //     return prevArr;
    //   }
    //   newTabs[projectIdx].widgetList = [...newWidgets];
    //   // 확인된 currTitle 값을 토대로, 경로 이동
    //   // 고유의 id값을 지정할까 생각했지만
    //   // 서비스에서 나타날 수 있는 경우의 수가 4개뿐이라
    //   // 그냥 title로 확인함
    //   switch (currTitle) {
    //     case '대시보드':
    //       navigate(`/project/${projectId}/dashboard`);
    //       break;
    //     case '이슈':
    //       navigate(`/project/${projectId}/issues`);
    //       break;
    //     case `캘린더`:
    //       navigate(`/project/${projectId}/calendar`);
    //       break;
    //     case '간트차트':
    //       navigate(`/project/${projectId}/gantt-chart`);
    //       break;
    //   }
    //   return newTabs;
    // });
  };

  // 위젯 탭을 삭제하는 함수
  const closeWidgetHandler = (projectIdx: number, title: string) => {
    const currWidgetList = projectTabList[projectIdx].widgetList;
    const newTabs = projectTabList.map(({ id, isActivated, title, widgetList }: tabType) => {
      return {
        id,
        isActivated,
        title,
        widgetList,
      };
    });
    const newWidgets: widgetType[] = currWidgetList.filter(widget => widget.title !== title);
    newTabs[projectIdx].widgetList = [...newWidgets];
    console.log(newTabs);
    localStorage.setItem('project-tab-list', JSON.stringify(newTabs));
    projectTabList = JSON.parse(localStorage.getItem('project-tab-list') as string);
    // setTabList((prevArr: tabType[]) => {
    //   const currWidgetList = prevArr[projectIdx].widgetList;
    //   // 결과적으로 이중 배열의 형태이기 때문에
    //   // 한번의 복제를 해야한다.
    //   const newTabs = prevArr.map(({ id, isActivated, title, widgetList }: tabType) => {
    //     return {
    //       id,
    //       isActivated,
    //       title,
    //       widgetList,
    //     };
    //   });
    //   const newWidgets: widgetType[] = currWidgetList.filter(
    //     (widget: widgetType) => widget.title !== title,
    //   );
    //   // 해당 프로젝트의 widgetList에
    //   // 수정 값을 반영
    //   newTabs[projectIdx].widgetList = [...newWidgets];
    //   // 수정환 newTabs를 반환
    //   return newTabs;
    // });
  };

  // console.log(projectTabList.length);

  // 현재 킨 프로젝트가 이미 localStorage로 데이터가 있는지 확인
  console.log(projectTabList);
  let check = true;
  for (let i = 0; i < projectTabList.length; i++) {
    if (projectTabList[i].id === +currProjectId) {
      projectTabList.forEach(item => {
        item.isActivated = false;
      });
      projectTabList[i].isActivated = true;
      localStorage.setItem('project-tab-list', JSON.stringify(projectTabList));
      projectTabList = JSON.parse(localStorage.getItem('project-tab-list') as string);
      check = false;
      break;
    }
  }

  if (check) {
    // 현재 킨 프로젝트가 처음 들어가는 프로젝트 인 경우 -> 프로젝트 탭을 만들어야 하는 경우
    // 일단 모든 탭 false로
    projectTabList.forEach(item => {
      item.isActivated = false;
    });
    if (getProject.isSuccess) {
      localStorage.setItem(
        'project-tab-list',
        JSON.stringify([
          ...projectTabList,
          {
            id: +currProjectId,
            isActivated: true,
            title: getProject.data.name,
            widgetList: [{ isActivated: true, title: '대시보드' }],
          },
        ]),
      );
    }
    projectTabList = JSON.parse(localStorage.getItem('project-tab-list') as string);
  }

  return createPortal(
    <>
      <NavProject>
        {projectTabList.map(({ isActivated, title, id }: tabType, idx: number) => (
          <Tab
            key={idx}
            type={'project'}
            isActivated={isActivated}
            title={title}
            toggleHandler={activateToggleHandler.bind(null, id, isActivated)}
            closeHandler={closeTabHandler.bind(null, id)}
            xBtn={isActivated}
          ></Tab>
        ))}
        <Tab
          key={-1}
          type={'project'}
          isActivated={false}
          title={'+'}
          plus={true}
          xBtn={false}
          createHandler={() => navigate('/projects')}
        ></Tab>
      </NavProject>
      <NavWidget>
        {projectTabList.map(
          ({ isActivated, widgetList }: tabType, projectIdx: number) =>
            isActivated &&
            widgetList.map(({ isActivated, title }: widgetType, idx: number) => {
              return (
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
              );
            }),
        )}
        <Tab
          key={-2}
          type={'widget'}
          isActivated={false}
          title={'+'}
          plus={true}
          xBtn={false}
          createHandler={() => navigate(`/project/${currProjectId}/widgets`)}
        ></Tab>
      </NavWidget>
    </>,
    el as HTMLElement,
  );
});

export default index;
