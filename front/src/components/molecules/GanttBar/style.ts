import styled from 'styled-components';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledGanttBar = styled.div<styledType>``;
StyledGanttBar.defaultProps = {};
