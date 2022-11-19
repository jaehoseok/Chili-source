// API & Library
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetWidgetJiraData } from 'hooks/widgetData';

// Styles
import {
  StyledWidgetData,
  StyledWidgetDataLabel,
  StyledWidgetDataContent,
  styledType,
} from '../style';
import { StyledJiraData } from './style';

interface propsType extends styledType {
  url?: string | null;
  path?: string;
}

export const JIRA = ({ url }: propsType) => {
  // Init
  const navigate = useNavigate();
  const { projectId } = useParams();
  const widgetJiraData = useGetWidgetJiraData().data;

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

    newProjectList[idx].widgetList['issues'] = true;
    localStorage.setItem('project-tab-list', JSON.stringify(newProjectList));
    navigate(`/project/${projectId}/issues`);
  };

  // Return
  return (
    <>
      <StyledWidgetData ratio="1/2" height="265px" onClick={clickHandler}>
        <StyledWidgetDataLabel>미들버킷</StyledWidgetDataLabel>
        <StyledWidgetDataContent>
          <StyledJiraData>
            <div
              style={{
                height: '80%',
                width: '80%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid black',
                borderRadius: '50%',
              }}
            >
              <div>지라 달성률</div>
              <h1>{widgetJiraData || 0} %</h1>
            </div>
          </StyledJiraData>
        </StyledWidgetDataContent>
      </StyledWidgetData>
    </>
  );
};
