// API & Library
import { useNavigate, useParams } from 'react-router-dom';

// Styles
import {
  StyledWidgetData,
  StyledWidgetDataLabel,
  StyledWidgetDataContent,
  styledType,
} from '../style';

interface propsType extends styledType {
  url?: string | null;
  path?: string;
}

export const JIRA = ({ url }: propsType) => {
  // Init
  const navigate = useNavigate();
  const { projectId } = useParams();

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
    navigate(`/project/${projectId}/issuesr`);
  };

  // Return
  return (
    <>
      <StyledWidgetData ratio="1/2" height="265px" onClick={clickHandler}>
        <StyledWidgetDataLabel>미들버킷</StyledWidgetDataLabel>
        <StyledWidgetDataContent>{url}</StyledWidgetDataContent>
      </StyledWidgetData>
    </>
  );
};
