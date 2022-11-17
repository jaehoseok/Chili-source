import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  col?: number;
  height?: string;
  backgroundColor?: string;
}

export const StyledWidgetData = styled.div<styledType>`
  ${tw``}
  width: ${({ col }) => `${(480 - ((col ? col : 1) - 1) * 32) / (col ? col : 1)}px`};
  height: ${({ height }) => `${height ? height : '120px'}`};
  background-color: ${({ backgroundColor }) => `${backgroundColor}`};
`;
