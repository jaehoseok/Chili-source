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
      case 'TEST':
        return <StyledWidgetData>[{children}] 테스트</StyledWidgetData>;
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
