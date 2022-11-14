import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledGanttGraph = styled.div<styledType>`
  ${tw`w-full bg-gray-200`}
`;
