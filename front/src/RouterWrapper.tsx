import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './components/pages/LandingPage';
import ProjectSelectPage from './components/pages/ProjectSelectPage';
import ProjectDashBoardPage from './components/pages/ProjectDashBoardPage';
import ProjectSettingPage from './components/pages/ProjectSettingPage';
import UserSettingPage from './components/pages/UserSettingPage';
import GanttChartPage from './components/pages/GanttChartPage';
import CalendarPage from './components/pages/CalendarPage';
import BucketPage from './components/pages/BucketPage';
import GitLogPage from './components/pages/GitLogPage';
import ProjectCreatePage from './components/pages/ProjectCreatePage';
import WidgetSelectPage from './components/pages/WidgetSelectPage';

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
        <Route path="/projects" element={<ProjectSelectPage />} />
        <Route path="/projects/create" element={<ProjectCreatePage />} />
        <Route path="/setting/:userId" element={<UserSettingPage />} />
      </Routes>
      <Routes>
        <Route path="/projects/:projectId" element={<ProjectDashBoardPage />} />
        <Route path="/projects/:projectId/setting" element={<ProjectSettingPage />} />
        <Route path="/projects/:projectId/widget/select" element={<WidgetSelectPage />} />
        <Route path="/projects/:projectId/widget/ganttChart" element={<GanttChartPage />} />
        <Route path="/projects/:projectId/widget/calendar" element={<CalendarPage />} />
        <Route path="/projects/:projectId/widget/bucket" element={<BucketPage />} />
        <Route path="/projects/:projectId/widget/gitLog" element={<GitLogPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterWrapper;
