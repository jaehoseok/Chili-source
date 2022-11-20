// API & Library
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Chart } from 'react-google-charts';
import { useGetWidgetCalendarData, useSetWidgetCalendarData } from 'hooks/widgetData';
import { propsType } from '../../';

// Styles
import { StyledWidgetData, StyledWidgetDataLabel, StyledWidgetDataContent } from '../style';
import { StyledCalendarData } from './style';

export const CALENDAR = ({ url }: propsType) => {
  // Init
  const navigate = useNavigate();
  const { projectId } = useParams();
  const widgetCalendarData = useGetWidgetCalendarData().data;
  const setWidgetCalendarData = useSetWidgetCalendarData().mutate;
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

  const ChartRenderer = (
    data: (
      | (number | Date)[]
      | {
          type: string;
          id: string;
        }[]
    )[],
  ) => {
    return (
      <Chart
        height={240}
        width={1200}
        chartType="Calendar"
        data={data}
        options={{
          calendar: { cellSize: 20 },
          colorAxis: { colors: ['#54C270', '#C7F800'], minValue: 1, maxValue: 5 },
        }}
      />
    );
  };

  // LifeCycle
  useEffect(() => {
    setWidgetCalendarData();
  }, [projectId]);

  // Return
  return (
    <>
      <StyledWidgetData ratio="1/1" height="300px" onClick={clickHandler}>
        <StyledWidgetDataLabel>달력</StyledWidgetDataLabel>
        <StyledWidgetDataContent>
          <StyledCalendarData>
            {widgetCalendarData ? ChartRenderer(widgetCalendarData) : ''}
          </StyledCalendarData>
        </StyledWidgetDataContent>
      </StyledWidgetData>
    </>
  );
};
