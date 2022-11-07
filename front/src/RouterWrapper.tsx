import { BrowserRouter, Routes, Route } from 'react-router-dom';

// landing
import LandingPage from 'components/pages/LandingPage';

// login
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

// common
import HeaderNav from 'components/organisms/common/HeaderServiceNav';
import HeaderInit from 'components/organisms/common/HeaderInitNav';

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
        <Route
          path="/"
          element={
            <>
              <HeaderInit />
              <LandingPage />
            </>
          }
        />
        <Route path="/user" element={<UserLoginLoadingPage />} />
        <Route path="/setting/:userId" element={<UserSettingPage />} />
        <Route path="/projects" element={<ProjectSelectPage />} />
        <Route path="/new-project" element={<ProjectCreatePage />} />
      </Routes>
      <Routes>
        <Route
          path="/project/:projectId/dashboard"
          element={
            <>
              <ProjectDashBoardPage />
            </>
          }
        />
        <Route
          path="/project/:projectId/setting"
          element={
            <>
              <HeaderNav />
              <ProjectSettingPage />
            </>
          }
        />
        <Route
          path="/project/:projectId/widgets"
          element={
            <>
              <HeaderNav />
              <WidgetSelectPage />
            </>
          }
        />
        <Route
          path="/project/:projectId/gantt-chart"
          element={
            <>
              <HeaderNav />
              <GanttChartPage />
            </>
          }
        />
        <Route
          path="/project/:projectId/calendar"
          element={
            <>
              <HeaderNav />
              <CalendarPage />
            </>
          }
        />
        <Route
          path="/project/:projectId/issues"
          element={
            <>
              <HeaderNav />
              <IssuesPage />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterWrapper;
