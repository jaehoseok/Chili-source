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

export const GANTT = ({ url }: propsType) => {
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

    newProjectList[idx].widgetList['gantt-chart'] = true;
    localStorage.setItem('project-tab-list', JSON.stringify(newProjectList));
    navigate(`/project/${projectId}/gantt-chart`);
  };

  // Return
  return (
    <>
      <StyledWidgetData ratio="1/1" height="494px" onClick={clickHandler}>
        <StyledWidgetDataLabel>간트차트</StyledWidgetDataLabel>
        <StyledWidgetDataContent>{url}</StyledWidgetDataContent>
      </StyledWidgetData>
    </>
  );
};
