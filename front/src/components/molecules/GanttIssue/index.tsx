import { ReactNode } from 'react';
import { StyledGanttIssue, styledType } from './style';

interface propsType extends styledType {
  children?: ReactNode;
}

/**
 * @description
 * 만드는 중 입니다.
 *
 * @author inte
 */
export const GanttIssue = ({}: propsType) => {
  return (
    <>
      <StyledGanttIssue></StyledGanttIssue>
    </>
  );
};
