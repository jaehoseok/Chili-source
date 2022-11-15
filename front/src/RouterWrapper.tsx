// API & Library
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// landing
import LandingPage from 'components/pages/LandingPage';

// error
import ErrorPage from 'components/pages/ErrorPage';

// login
import UserLoginPage from 'components/pages/UserLoginPage';
import UserLoginLoadingPage from 'components/pages/UserLoginLoadingPage';

// setting
import UserSettingPage from 'components/pages/UserSettingPage';

// project
import ProjectSelectPage from 'components/pages/ProjectSelectPage';
import ProjectDashBoardPage from 'components/pages/ProjectDashBoardPage';
import ProjectSettingPage from 'components/pages/ProjectSettingPage';
import ProjectCreatePage from 'components/pages/ProjectCreatePage';

// widget
import WidgetSelectPage from 'components/pages/WidgetSelectPage';
import IssuesPage from 'components/pages/IssuesPage';
import GanttChartPage from 'components/pages/GanttChartPage';
import CalendarPage from 'components/pages/CalendarPage';

// Router navigation guard
/**
 * @description
 * JSX element 를 받고 상황 체크 후
 *
 * @param el
 * @author inte
 */
const guardedElement = (el: JSX.Element) => {
  console.log('[Auth token]: ', localStorage.getItem('Authorization'));
  // Pass
  if (localStorage.getItem('Authorization')) return el;
  // Guard
  return <UserLoginPage></UserLoginPage>;
};

/**
 *
 * @description
 * React-Router 경로 설정을 총괄하는 컴포넌트
 *
 * @author bell
 */
const RouterWrapper = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<UserLoginLoadingPage />} />
        <Route path="/setting/:userId" element={guardedElement(<UserSettingPage />)} />
        <Route path="/projects" element={guardedElement(<ProjectSelectPage />)} />
        <Route path="/new-project" element={guardedElement(<ProjectCreatePage />)} />

        <Route path="/project/:projectId/*">
          <Route path="dashboard" element={guardedElement(<ProjectDashBoardPage />)} />
          <Route path="setting" element={<ProjectSettingPage />} />
          <Route path="widgets/:columnIdx" element={<WidgetSelectPage />} />
          <Route path="gantt-chart" element={<GanttChartPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="issues" element={<IssuesPage />} />
        </Route>
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterWrapper;
