// API & Library
import { ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
        return (
          <StyledWidgetData className="calendar" height="480px" width="480px">
            <div>
              {children}-{type}
            </div>
          </StyledWidgetData>
        );
      case 'GANTT':
        return (
          <StyledWidgetData className="gantt-chart" height="480px" width="480px">
            <div>
              {children}-{type}
            </div>
          </StyledWidgetData>
        );
      case 'JIRA':
        return (
          <StyledWidgetData className="jira" width="224px" height="224px">
            <div>
              {children}-{type}
            </div>
          </StyledWidgetData>
        );
      case 'SSAFYGITLAB':
        return (
          <StyledWidgetData className="ssafy-gitlab" width="224px" height="224px">
            <div>
              {children}-{type}
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
