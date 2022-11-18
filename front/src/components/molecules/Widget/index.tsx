// API & Library
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Chart } from 'react-google-charts';

// styles
import { StyledWidget, StyledWidgetData, styledType } from './style';

// components
import Sheet from 'components/atoms/Sheet';

interface propsType extends styledType {
  type?: string;
  path?: string;
  children?: ReactNode;
}

/**
 * @description
 * 위젯을 만드는 컴포넌트
 *
 * @param {string?} type - #위젯 타입 문자열
 *
 * @author inte
 */
export const Widget = ({ type, path, children }: propsType) => {
  // Init
  const navigate = useNavigate();
  const { projectId } = useParams();
  // 가데이터용
  const [jiraData, setJiraData] = useState(0);
  const [gitData, setGitData] = useState(0);
  useEffect(() => {
    const tempFunc = setInterval(() => {
      setJiraData(Math.random() * 100);
    }, 1200);

    return () => {
      clearInterval(tempFunc);
    };
  });
  useEffect(() => {
    const tempGitFunc = setInterval(() => {
      setGitData(Math.random() * 100);
    }, 1200);

    return () => {
      clearInterval(tempGitFunc);
    };
  });

  const splitPath = path ? path.split('-') : ['0'];

  // Methods
  const addWidgetHandler = () => {
    navigate(`/project/${projectId}/widgets/${splitPath[0]}`);
  };

  const updateWidgetTabHandler = (widgetName: string) => {
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

    newProjectList[idx].widgetList[widgetName] = true;
    localStorage.setItem('project-tab-list', JSON.stringify(newProjectList));
    navigate(`/project/${projectId}/${widgetName}`);
  };

  const widgetData = (type: string, children: ReactNode) => {
    switch (type) {
      case 'CALENDAR':
        // Methods
        const clickCalendarHandler = () => {
          updateWidgetTabHandler('calendar');
        };

        // Return
        return (
          <StyledWidgetData
            className="widget-calendar"
            height="320px"
            width="480px"
            onClick={clickCalendarHandler}
          >
            <div>
              {children}-{type}
            </div>
            <div style={{ height: '80%', width: '80%' }}>
              <Chart
                chartType="Calendar"
                height="100%"
                width="100%"
                data={[
                  [
                    { type: 'date', id: 'Date' },
                    { type: 'number', id: 'Won/Loss' },
                  ],
                  [new Date(2013, 2, 4), 10],
                  [new Date(2013, 2, 5), 3],
                  [new Date(2013, 2, 7), -1],
                  [new Date(2013, 2, 8), 2],
                  [new Date(2013, 2, 12), -1],
                  [new Date(2013, 2, 13), 1],
                  [new Date(2013, 2, 15), 1],
                  [new Date(2013, 2, 16), -4],
                  [new Date(2013, 1, 4), 10],
                  [new Date(2013, 1, 5), 3],
                  [new Date(2013, 1, 7), -1],
                  [new Date(2013, 1, 8), 2],
                  [new Date(2013, 1, 12), -1],
                  [new Date(2013, 1, 13), 1],
                  [new Date(2013, 1, 15), 1],
                  [new Date(2013, 1, 16), -4],
                ]}
              />
            </div>
          </StyledWidgetData>
        );
      case 'GANTT':
        // Methods
        const clickGanttHandler = () => {
          updateWidgetTabHandler('gantt-chart');
        };

        // Return
        return (
          <StyledWidgetData
            className="widget-gantt-chart"
            height="480px"
            width="480px"
            onClick={clickGanttHandler}
          >
            <div>
              {children}-{type}
            </div>
            <div style={{ height: '80%', width: '80%' }}>
              <Chart
                chartType="ScatterChart"
                data={[
                  ['Age', 'Weight'],
                  [4, 5.5],
                  [8, 12],
                ]}
                width="100%"
                height="100%"
                legendToggle
              />
            </div>
          </StyledWidgetData>
        );
      case 'JIRA':
        // Methods
        const clickJiraHandler = () => {
          updateWidgetTabHandler('issues');
        };

        // Return
        return (
          <StyledWidgetData
            className="widget-jira"
            width="224px"
            height="224px"
            onClick={clickJiraHandler}
          >
            <div>
              {children}-{type}
            </div>
            <div style={{ height: '80%', width: '80%' }}>
              <Chart
                chartType="Gauge"
                width="100%"
                height="100%"
                data={[
                  ['Label', 'Value'],
                  ['의미없음ㅋ', jiraData],
                ]}
                options={{
                  yellowFrom: 50,
                  yellowTo: 75,
                  redFrom: 75,
                  redTo: 100,
                  minorTicks: 5,
                }}
              />
            </div>
          </StyledWidgetData>
        );
      case 'SSAFYGITLAB':
        // Methods
        const clickGitHandler = () => {
          alert('깃 주소로 이동할까요?');
        };
        return (
          <StyledWidgetData
            className="widget-ssafy-gitlab"
            width="224px"
            height="224px"
            onClick={clickGitHandler}
          >
            <div>
              {children}-{type}
            </div>
            <div style={{ height: '80%', width: '80%' }}>
              <Chart
                chartType="Gauge"
                height="100%"
                width="100%"
                data={[
                  ['Label', 'Value'],
                  ['의미없음ㅋ', gitData],
                ]}
                options={{
                  redFrom: 90,
                  redTo: 100,
                  yellowFrom: 75,
                  yellowTo: 90,
                  minorTicks: 5,
                }}
              />
            </div>
          </StyledWidgetData>
        );
      case 'ADD':
        return (
          <StyledWidgetData
            className="btn-add-widget"
            onClick={addWidgetHandler}
            width="440px"
            height="40px"
            backgroundColor="#d4d4d4"
          >
            +
          </StyledWidgetData>
        );
      case 'label':
        return (
          <StyledWidgetData
            className="label"
            width="400px"
            height="4px"
            backgroundColor="#d4d4d4"
          ></StyledWidgetData>
        );
    }
  };

  return (
    <>
      <StyledWidget className="widget">
        <Sheet isShadow={true}>{widgetData(type || '', children)}</Sheet>
      </StyledWidget>
    </>
  );
};
