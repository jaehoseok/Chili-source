// API & Library
import { ReactNode } from 'react';

// styles
import { StyledWidget, styledType } from './style';

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

  const widgetData = (type: string) => {
    if (type == 'plus') return <>+</>;
    return <>위젯내용</>;
  };

  return (
    <>
      <StyledWidget height={height} width={width}>
        <Sheet isShadow={true} height="100%" width="100%">
          <div>{children}</div>
          <div>{widgetData(type || 'plus')}</div>
        </Sheet>
      </StyledWidget>
    </>
  );
};
