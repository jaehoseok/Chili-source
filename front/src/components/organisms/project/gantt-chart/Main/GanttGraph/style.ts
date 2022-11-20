import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledGanttGraph = styled.div<styledType>`
  ${tw`w-full overflow-hidden`}
  height: calc(100vh - 140px);
`;
