import { MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';

// import { useRecoilState } from 'recoil';
// import { tabListState, tabType, widgetType } from '../../../../recoil/atoms/projectList';

import NavProject from 'components/molecules/NavProject';
import NavWidget from 'components/molecules/NavWidget';
import Tab from 'components/atoms/Tab';
import { useGetProject, useGetTeamForProject } from 'hooks/project';
import { useGetUserInfoHandler } from 'hooks/user';

interface widgetType {
  dashboard: boolean;
  'gantt-chart': boolean;
  calendar: boolean;
  setting: boolean;
  issues: boolean;
}

interface tabType {
  id: number;
  widgetList: widgetType;
  title: string;
  isActivated: boolean;
}

/**
 *
 * @description
 * navProject 컴포넌트와, navWidget 컴포넌트 및 프로젝트 데이터를 관리하는 common 컴포넌트
 * 탭마다 경로 이동이 이루어지기 떄문에 recoil을 통해 상태관리 데이터르 관리한다.
 *
 * @author bell
 */
const index = () => {
  // portal 용 태그
  const el = document.getElementById('nav-service-root');

  // React-router
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 프로젝트 id 값 구해두기
  const currProjectId = location.pathname.split('/')[2];

  // 쿼리 데이터
  const getProject = useGetProject(+currProjectId);
  const getUserInfo = useGetUserInfoHandler();
  const getTeamForProject = useGetTeamForProject(+currProjectId);

  // 디벨로퍼인지 아닌지 확인하는 함수
  const isDeveloperHandler = () => {
    const users = getTeamForProject.data;
    if (users) {
      for (const user of users) {
        if (user.userId === getUserInfo.data?.id) {
          return user.role.id === 'DEVELOPER';
        }
      }
    }
  };

  const GETTABPROJECT = localStorage.getItem('project-tab-list');

  // 첫 유저인 경우, localStorage에 'project-tab-list' 아직 안만든 경우
  if (!GETTABPROJECT) {
    if (getProject) localStorage.setItem('project-tab-list', JSON.stringify([]));
  }

  // 현재 탭리스트 데이터
  let projectTabList: tabType[] = JSON.parse(localStorage.getItem('project-tab-list') as string);

  // 프로젝트 탭을 활성화시키는 함수
  // 해당 Tab이 활성화 되는 경우, 다른 Tab은 활성화가 종료 되며,
  // 활성화 된 컴포넌트에 맞게 경로가 이동되어야 한다.
  // 프로젝트 데이터가 없는 경우는 ProjectSelectPage로 이동한다.
  const activateToggleHandler = (e: MouseEvent<HTMLSpanElement>, id: number) => {
    const target = e.target as HTMLElement;
    // X 태그는 탭 안에 있다.
    // X 태그 함수를 실행하면, event 버블을 통해, 탭 활성 함수도 실행되게 된다.
    // 이러한 경우 에러가 나타날 수 있으니
    // 간이적으로 이벤트 전파를 차단하는 조건을 걸었다.
    if (target.innerHTML === 'X') {
      return;
    }

    if (projectTabList.length <= 0) navigate('/projects');

    const newProjectTabList = [...projectTabList];
    const currProjectIdx = newProjectTabList.findIndex(project => project.id === id);

    newProjectTabList[currProjectIdx].isActivated = true;
    localStorage.setItem('project-tab-list', JSON.stringify(newProjectTabList));

    navigate(`/project/${id}/dashboard`, { state: 'toggleTabEvent' });
  };

  // 해당 프로젝트 탭을 삭제하는 함수
  const closeTabHandler = (id: number) => {
    const newTabs = [...projectTabList];
    // 필터링을 통해, 해당 id를 제외한
    // 새 프로젝트 데이터를 반환하다.
    localStorage.setItem('project-tab-list', JSON.stringify(newTabs.filter(tab => tab.id !== id)));

    // tab을 다 삭제해서 데이터가 없는 경우 index 에러가 난다.
    // index 에러가 나면 더이상 탭이 없기 때문에
    // 프로젝트 선택 페이지로 이동하도록 처리했다.
    try {
      const projectId = JSON.parse(localStorage.getItem('project-tab-list') as string)[0].id;
      navigate(`/project/${projectId}/dashboard`);
    } catch {
      navigate(`/projects`);
    }
  };

  // 위젯 탭을 활성화, 비활성화시키는 함수
  // 설계 방식은 actiavatedToggleHandler와 비슷하다.
  const activatedToggleWidgetHandler = (
    projectId: number,
    projectName: string, // 현재 projectList 중 해당 project의 idx값
  ) => {
    const newProjectList = [...projectTabList];
    const idx = newProjectList.findIndex(project => project.id === projectId);

    newProjectList[idx].widgetList = {
      dashboard: false,
      'gantt-chart': false,
      calendar: false,
      setting: false,
      issues: false,
    };
    switch (projectName) {
      case '대시보드':
        newProjectList[idx].widgetList.dashboard = true;
        navigate(`/project/${projectId}/dashboard`);
        break;
      case '미들버킷':
        newProjectList[idx].widgetList.issues = true;
        navigate(`/project/${projectId}/issues`);
        break;
      case `캘린더`:
        newProjectList[idx].widgetList.calendar = true;
        navigate(`/project/${projectId}/calendar`);
        break;
      case '간트차트':
        newProjectList[idx].widgetList['gantt-chart'] = true;
        navigate(`/project/${projectId}/gantt-chart`);
        break;
      case '설정':
        newProjectList[idx].widgetList.setting = true;
        navigate(`/project/${projectId}/setting`);
        break;
    }

    localStorage.setItem('project-tab-list', JSON.stringify(newProjectList));
  };

  // 현재 킨 프로젝트가 이미 localStorage로 데이터가 있는지 확인
  const idx = projectTabList.findIndex(project => project.id === +currProjectId);

  // idx가 -1이면 처음 들어오는 프로젝트 데이터 이므로, 기존의 데이터 뒤에 추가해주어야 한다.
  if (idx < 0) {
    const newProjectTabList = [...projectTabList];
    newProjectTabList.forEach(item => {
      item.isActivated = false;
    });

    // 프로젝트 데이터 추가
    if (getProject.data) {
      localStorage.setItem(
        'project-tab-list',
        JSON.stringify([
          ...newProjectTabList,
          {
            id: +currProjectId,
            isActivated: true,
            title: getProject.data.name,
            widgetList: {
              dashboard: true,
              'gantt-chart': false,
              calendar: false,
              setting: false,
              issues: false,
            },
          },
        ]),
      );
    }
    // 기존의 데이터가 있는 경우에는 경우가 2가지가 있따.
    // 탭을 선택하여 오는 활성화를 건드리는 경우와,
    // 프로젝트 선택페이지에서 선택하여 활성화되는 경우이다.
    // 다른 프로젝트에 있다가, 프로젝트 선택페이지를 직접 선택하는 경우
  } else if (location.state === 'toggleTabEvent') {
    const newProjectTabList = [...projectTabList];
    newProjectTabList.forEach(item => {
      item.isActivated = false;
    });
    newProjectTabList[idx].isActivated = true;
    newProjectTabList[idx].widgetList = {
      dashboard: true,
      'gantt-chart': false,
      calendar: false,
      setting: false,
      issues: false,
    };
    localStorage.setItem('project-tab-list', JSON.stringify(newProjectTabList));
    // 프로젝트 선택페이지에서 직접 선택하여 탭을 활성화하는 경우
  } else {
    const newProjectTabList = [...projectTabList];
    newProjectTabList.forEach(item => {
      item.isActivated = false;
    });
    newProjectTabList[idx].isActivated = true;

    localStorage.setItem('project-tab-list', JSON.stringify(newProjectTabList));
  }
  projectTabList = JSON.parse(localStorage.getItem('project-tab-list') as string);

  return createPortal(
    <>
      <NavProject>
        {projectTabList.map(({ isActivated, title, id }: tabType, idx: number) => (
          <Tab
            key={idx}
            type={'project'}
            isActivated={isActivated}
            title={title}
            toggleHandler={e => activateToggleHandler(e, id)}
            closeHandler={() => closeTabHandler(id)}
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
          ({ isActivated, widgetList, id }: tabType) =>
            isActivated && (
              <>
                <Tab
                  title={'대시보드'}
                  isActivated={widgetList.dashboard}
                  xBtn={false}
                  type="widget"
                  toggleHandler={() => activatedToggleWidgetHandler(id, '대시보드')}
                ></Tab>
                <Tab
                  title={'미들버킷'}
                  isActivated={widgetList.issues}
                  xBtn={false}
                  type="widget"
                  toggleHandler={() => activatedToggleWidgetHandler(id, '미들버킷')}
                ></Tab>
                <Tab
                  title={'간트차트'}
                  isActivated={widgetList['gantt-chart']}
                  xBtn={widgetList['gantt-chart']}
                  type="widget"
                  toggleHandler={() => activatedToggleWidgetHandler(id, '간트차트')}
                ></Tab>
                <Tab
                  title={'캘린더'}
                  isActivated={widgetList.calendar}
                  xBtn={false}
                  type="widget"
                  toggleHandler={() => activatedToggleWidgetHandler(id, '캘린더')}
                ></Tab>
                {!isDeveloperHandler() && (
                  <Tab
                    title={'설정'}
                    isActivated={widgetList.setting}
                    xBtn={false}
                    type="widget"
                    toggleHandler={() => activatedToggleWidgetHandler(id, '설정')}
                  ></Tab>
                )}
              </>
            ),
        )}
      </NavWidget>
    </>,
    el as HTMLElement,
  );
};
export default index;
