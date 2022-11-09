import { BrowserRouter, Routes, Route } from 'react-router-dom';

// landing
import LandingPage from 'components/pages/LandingPage';

// error
import ErrorPage from 'components/pages/ErrorPage';

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
        <Route path="/setting/:userId" element={<UserSettingPage />} />
        <Route path="/projects" element={<ProjectSelectPage />} />
        <Route path="/new-project" element={<ProjectCreatePage />} />

        <Route path="/project/:projectId/*">
          <Route path="dashboard" element={<ProjectDashBoardPage />} />
          <Route path="setting" element={<ProjectSettingPage />} />
          <Route path="widgets" element={<WidgetSelectPage />} />
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
