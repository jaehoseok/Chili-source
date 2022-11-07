// API & Library
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { project } from 'api/rest';

// Styles
import { StyledPage, StyledHeaderGap, StyledBody, StyledSection } from './style';

// Components
import HeaderNav from 'components/organisms/common/HeaderServiceNav';
import { ProjectInfo, WidgetList } from 'components/organisms/project/dashboard';

const GanttChartPage = () => {
  // Init
  const [projectData, setProjectData] =
    useState<Awaited<ReturnType<typeof project.getProjectData>>>();
  const location = useLocation();

  // Methods
  useEffect(() => {
    // console.log('기동', location.pathname.split('/')[2]);
  }, []);

  useEffect(() => {
    (async () => {
      const resp = await project.getProjectData(location.pathname.split('/')[2]);
      setProjectData(resp);
    })();
  }, []);

  return (
    <>
      <StyledPage>
        <StyledHeaderGap>
          <HeaderNav />
        </StyledHeaderGap>
        <div>---[데이터 테스트 공간]---</div>
        <div>[id]: {projectData ? projectData.id : ''}</div>
        <div>[name]: {projectData ? projectData.name : ''}</div>
        <div>[description]: {projectData ? projectData.description : ''}</div>
        <div>[image]: {projectData ? projectData.image : ''}</div>
        <div>[latestGanttVersion]: {projectData ? projectData.latestGanttVersion : ''}</div>
        <div>[jiraProject]: {projectData ? projectData.jiraProject : ''}</div>
        <div>[gitRepo]: {projectData ? projectData.gitRepo : ''}</div>
        <div>-------------------------</div>
        <div>---[위젯 테스트 공간]---</div>
        <div>[id]: {projectData ? projectData.id : ''}</div>
        <div>[name]: {projectData ? projectData.name : ''}</div>
        <div>[description]: {projectData ? projectData.description : ''}</div>
        <div>[image]: {projectData ? projectData.image : ''}</div>
        <div>[latestGanttVersion]: {projectData ? projectData.latestGanttVersion : ''}</div>
        <div>[jiraProject]: {projectData ? projectData.jiraProject : ''}</div>
        <div>[gitRepo]: {projectData ? projectData.gitRepo : ''}</div>
        <div>-------------------------</div>
        <StyledBody>
          <ProjectInfo />
          <StyledSection>
            <WidgetList />
          </StyledSection>
        </StyledBody>
      </StyledPage>
    </>
  );
};

export default GanttChartPage;
