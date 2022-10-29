import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// landing
import LandingPage from 'components/pages/LandingPage';

// setting
import UserSettingPage from 'components/pages/UserSettingPage';

// project
import ProjectSelectPage from 'components/pages/ProjectSelectPage';
import ProjectDashBoardPage from 'components/pages/ProjectDashBoardPage';
import ProjectSettingPage from 'components/pages/ProjectSettingPage';
import ProjectCreatePage from 'components/pages/ProjectCreatePage';

// widget
import WidgetSelectPage from 'components/pages/WidgetSelectPage';
import BucketPage from 'components/pages/BucketPage';
import GitLogPage from 'components/pages/GitLogPage';
import GanttChartPage from 'components/pages/GanttChartPage';
import CalendarPage from 'components/pages/CalendarPage';

// common
import HeaderNav from './HeaderNav';

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
        <Route path="/setting/:userId" element={<UserSettingPage />} />
        <Route path="/projects" element={<ProjectSelectPage />} />
      </Routes>
      <Routes>
        <Route
          path="/projects/:projectId"
          element={
            <>
              <HeaderNav />
              <ProjectDashBoardPage />
            </>
          }
        />
        <Route
          path="/projects/:projectId/setting"
          element={
            <>
              <HeaderNav />
              <ProjectSettingPage />
            </>
          }
        />
        <Route
          path="/projects/:projectId/widget/select"
          element={
            <>
              <HeaderNav />
              <WidgetSelectPage />
            </>
          }
        />
        <Route
          path="/projects/:projectId/widget/ganttChart"
          element={
            <>
              <HeaderNav />
              <GanttChartPage />
            </>
          }
        />
        <Route
          path="/projects/:projectId/widget/calendar"
          element={
            <>
              <HeaderNav />
              <CalendarPage />
            </>
          }
        />
        <Route
          path="/projects/:projectId/widget/bucket"
          element={
            <>
              <HeaderNav />
              <BucketPage />
            </>
          }
        />
        <Route
          path="/projects/:projectId/widget/gitLog"
          element={
            <>
              <HeaderNav />
              <GitLogPage />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterWrapper;
