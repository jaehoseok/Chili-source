// API & Library
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { project, widget } from 'api/rest';
import { useGetLayoutHandler } from 'hooks/widget';

// Styles
import { StyledPage, StyledHeader, StyledBody, StyledSection } from './style';

// Components
import HeaderNav from 'components/organisms/common/HeaderServiceNav';
import { ProjectInfo, WidgetList } from 'components/organisms/project/dashboard';

const GanttChartPage = () => {
  // Init
  const [projectData, setProjectData] = useState<Awaited<ReturnType<typeof project.getProject>>>();
  const [widgetList, setWidgetList] = useState<Awaited<ReturnType<typeof widget.getWidgetList>>>();
  const location = useLocation();
  const { projectId } = useParams();
  const getLayout = useGetLayoutHandler(Number(projectId));

  // Methods
  useEffect(() => {
    (async () => {
      const resp = await project.getProject(Number(location.pathname.split('/')[2]));
      setProjectData(resp);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const resp = await widget.getWidgetList(Number(location.pathname.split('/')[2]));
      setWidgetList(resp);
    })();
  }, []);

  return (
    <>
      <StyledPage>
        <StyledHeader>
          <HeaderNav />
        </StyledHeader>
        <StyledBody className="body">
          <ProjectInfo />
          <StyledSection className="section">
            <WidgetList />
          </StyledSection>
        </StyledBody>
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
        {widgetList
          ? widgetList.map((widgetData, index) => {
              return (
                <div key={index}>
                  <div>[id]: {widgetData.id}</div>
                  <div>[name]: {widgetData.name}</div>
                  <div>[col]: {widgetData.widgetCol}</div>
                  <div>[row]: {widgetData.widgetRow}</div>
                  <div>[code]: {widgetData.widgetCode}</div>
                  <div>[requestUrl]: {widgetData.requestUrl}</div>
                  <div>[detailRequestUrl]: {widgetData.detailRequestUrl}</div>
                  <div>,</div>
                </div>
              );
            })
          : '<div>위젯없음</div>'}
        <div>-------------------------</div>
        <div>---[리액트 쿼리 테스트 공간]---</div>
        {getLayout.data?.map(({ children }, index) => {
          console.log('[index]', index);
          children.map(({ type }) => {
            console.log('[type]', type);
          });
          return (
            <div key={index}>
              <div>컬럼{index}</div>
            </div>
          );
        })}
        <div>-------------------------</div>
      </StyledPage>
    </>
  );
};

export default GanttChartPage;
