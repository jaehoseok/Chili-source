import styled from 'styled-components';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledWidget = styled.div<styledType>``;
StyledWidget.defaultProps = {};
