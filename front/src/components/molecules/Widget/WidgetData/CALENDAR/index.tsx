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

export const CALENDAR = ({ url }: propsType) => {
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

    newProjectList[idx].widgetList['calendar'] = true;
    localStorage.setItem('project-tab-list', JSON.stringify(newProjectList));
    navigate(`/project/${projectId}/calendar`);
  };

  // Return
  return (
    <>
      <StyledWidgetData ratio="1/1" height="520px" onClick={clickHandler}>
        <StyledWidgetDataLabel>달력</StyledWidgetDataLabel>
        <StyledWidgetDataContent>1/1 {url}</StyledWidgetDataContent>
      </StyledWidgetData>
    </>
  );
};
