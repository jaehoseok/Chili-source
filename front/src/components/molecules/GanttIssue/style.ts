import styled from 'styled-components';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledGanttIssue = styled.div<styledType>``;
StyledGanttIssue.defaultProps = {};
