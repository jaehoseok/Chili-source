// API & Library
import { ReactNode } from 'react';

// styles
import { StyledWidget, StyledWidgetData, styledType } from './style';

// components
import Sheet from 'components/atoms/Sheet';

interface propsType extends styledType {
  type?: string;
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
export const Widget = ({ type, children, width, height }: propsType) => {
  // 없는 위젯 타입 선언시, require 에러 핸들링

  const addWidgetHandler = () => {
    console.log('da');
  };

  const widgetData = (type: string, children: ReactNode) => {
    switch (type) {
      case 'CALENLDAR':
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
      default:
        return <StyledWidgetData onClick={addWidgetHandler}>+</StyledWidgetData>;
    }
  };

  return (
    <>
      <StyledWidget className="widget" height={height} width={width}>
        <Sheet isShadow={true} height="100%" width="100%">
          {widgetData(type || 'plus', children)}
        </Sheet>
      </StyledWidget>
    </>
  );
};
