import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  col?: number;
  height?: string;
  backgroundColor?: string;
}

export const StyledWidgetData = styled.div<styledType>`
  ${tw``}
  width: ${({ col }) => `${(col ? col : 1) * 120}`}px;
`;
