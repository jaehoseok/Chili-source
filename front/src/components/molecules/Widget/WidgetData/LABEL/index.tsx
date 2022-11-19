// API & Library
import { MouseEventHandler } from 'react';

// Styles
import { StyledWidgetData, styledType } from '../style';

interface propsType extends styledType {
  url?: string | null;
  path?: string;
}

/**
 * @description 컬럼 단을 보여주는 라벨 역할 x
 * @author inte
 */
export const LABEL = () => {
  return (
    <>
      <StyledWidgetData col={2} height="4px" backgroundColor="#d4d4d4"></StyledWidgetData>
    </>
  );
};
