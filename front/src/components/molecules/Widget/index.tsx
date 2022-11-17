// API & Library
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Chart } from 'react-google-charts';

// styles
import { StyledWidget, StyledWidgetData, styledType } from './style';

// components
import { CALENDAR, GANTT, JIRA, SSAFYGITLAB } from './WidgetData';
import Sheet from 'components/atoms/Sheet';

interface propsType extends styledType {
  type?: string;
  path?: string;
  children?: ReactNode;
  requestURL?: string;
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

  const renderWidgetData = (type: string, children: ReactNode) => {
    switch (type) {
      case 'CALENDAR':
        return (
          <CALENDAR
            onClick={() => {
              updateWidgetTabHandler('calendar');
            }}
          ></CALENDAR>
        );
      case 'GANTT':
        return (
          <GANTT
            onClick={() => {
              updateWidgetTabHandler('gantt-chart');
            }}
          ></GANTT>
        );
      case 'JIRA':
        return (
          <JIRA
            onClick={() => {
              updateWidgetTabHandler('issues');
            }}
          ></JIRA>
        );
      case 'SSAFYGITLAB':
        // Methods
        const clickGitHandler = () => {
          alert('깃 주소로 이동할까요?');
        };
        return <SSAFYGITLAB onClick={clickGitHandler}></SSAFYGITLAB>;
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
        <Sheet isShadow={true}>{renderWidgetData(type || '', children)}</Sheet>
      </StyledWidget>
    </>
  );
};
