import { ReactNode } from 'react';
import { StyledGanttBar, styledType } from './style';

interface propsType extends styledType {
  children?: ReactNode;
}

/**
 * @description
 * 만드는 중 입니다.
 *
 * @author inte
 */
export const GanttBar = ({}: propsType) => {
  return (
    <>
      <StyledGanttBar></StyledGanttBar>
    </>
  );
};
