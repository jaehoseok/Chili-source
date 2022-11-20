// API & Library
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetWidgetGanttData, useSetWidgetGanttData } from 'hooks/widgetData';

// Styles
import {
  StyledWidgetData,
  StyledWidgetDataLabel,
  StyledWidgetDataContent,
  styledType,
} from '../style';
import { StyledGanttData } from './style';

// Components
import { GanttIssue } from 'components/molecules/GanttIssue';

// Init
interface propsType extends styledType {
  url?: string | null;
  path?: string;
}

export const GANTT = ({ url }: propsType) => {
  // Init
  const navigate = useNavigate();
  const { projectId } = useParams();
  const widgetGanttData = useGetWidgetGanttData().data;
  const setWidgetGanttData = useSetWidgetGanttData().mutate;

  // Methods
  const clickHandler = () => {
    const projectTabList = JSON.parse(localStorage.getItem('project-tab-list') as string);

    const newProjectList = [...projectTabList];
    const idx = newProjectList.findIndex(project => project.id == projectId);

    newProjectList[idx].widgetList = {
      dashboard: false,
      'gantt-chart': false,
      calendar: false,
      setting: false,
      issues: false,
    };

    newProjectList[idx].widgetList['gantt-chart'] = true;
    localStorage.setItem('project-tab-list', JSON.stringify(newProjectList));
    navigate(`/project/${projectId}/gantt-chart`);
  };

  // LifeCycle
  useEffect(() => {
    setWidgetGanttData();
  }, [projectId]);

  // Return
  return (
    <>
      <StyledWidgetData ratio="1/1" height="494px" onClick={clickHandler}>
        <StyledWidgetDataLabel>간트차트</StyledWidgetDataLabel>
        <StyledWidgetDataContent>
          <StyledGanttData>
            <div>오늘의 이슈들</div>
            {widgetGanttData?.map(
              ({ color, img, name, issueSummary, startTime, endTime, progress, version }) => {
                console.log('[todoy]', new Date(startTime || ''));

                return (
                  <GanttIssue
                    color={color}
                    img={img}
                    name={name}
                    issueSummary={issueSummary}
                    startTime={new Date(startTime || '')}
                    endTime={new Date(endTime || '')}
                    progress={progress}
                    version={version}
                  />
                );
              },
            )}
          </StyledGanttData>
        </StyledWidgetDataContent>
      </StyledWidgetData>
    </>
  );
};
