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

  const splitPath = path ? path.split('-') : ['0'];

  // Methods
  const addWidgetHandler = () => {
    navigate(`/project/${projectId}/widgets/${splitPath[0]}/${splitPath[1]}`);
  };

  const widgetData = (type: string, children: ReactNode) => {
    switch (type) {
      case 'CALENDAR':
        // Methods
        const clickCalendarHandler = () => {
          navigate(`/project/${projectId}/calendar`);
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
            <Chart
              chartType="Calendar"
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
          </StyledWidgetData>
        );
      case 'GANTT':
        // Methods
        const clickGanttHandler = () => {
          navigate(`/project/${projectId}/gantt-chart`);
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
            <Chart
              chartType="ScatterChart"
              data={[
                ['Age', 'Weight'],
                [4, 5.5],
                [8, 12],
              ]}
              width="100%"
              height="400px"
              legendToggle
            />
          </StyledWidgetData>
        );
      case 'JIRA':
        // Init
        const [jiraData, setJiraData] = useState(0);

        // Methods
        const clickJiraHandler = () => {
          navigate(`/project/${projectId}/issues`);
        };

        // LifeCycle
        useEffect(() => {
          const tempFunc = setInterval(() => {
            setJiraData(Math.random() * 100);
          }, 1200);

          return () => {
            clearInterval(tempFunc);
          };
        });

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
            <Chart
              chartType="Gauge"
              width="180px"
              data={[
                ['Label', 'Value'],
                ['의미없음ㅋ', jiraData],
              ]}
              options={{
                width: 180,
                height: 180,
                yellowFrom: 50,
                yellowTo: 75,
                redFrom: 75,
                redTo: 100,
                minorTicks: 5,
              }}
            />
          </StyledWidgetData>
        );
      case 'SSAFYGITLAB':
        // Init
        const [gitData, setGitData] = useState(0);

        // Methods
        const clickGitHandler = () => {
          alert('해당 주소로 이동하시겠습니까?');
        };

        // LifeCycle
        useEffect(() => {
          const tempGitFunc = setInterval(() => {
            setGitData(Math.random() * 100);
          }, 1200);

          return () => {
            clearInterval(tempGitFunc);
          };
        });
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
            <Chart
              chartType="Gauge"
              width="180px"
              data={[
                ['Label', 'Value'],
                ['의미없음ㅋ', gitData],
              ]}
              options={{
                width: 180,
                height: 180,
                redFrom: 90,
                redTo: 100,
                yellowFrom: 75,
                yellowTo: 90,
                minorTicks: 5,
              }}
            />
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
      default:
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
        <Sheet isShadow={true} height="100%" width="100%">
          {widgetData(type || '', children)}
        </Sheet>
      </StyledWidget>
    </>
  );
};
