import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledPage = styled.div<styledType>`
  ${tw`w-full flex flex-col items-center overflow-y-scroll`}
  height: calc(100vh - 66px);
`;

export const StyledHeader = styled.div<styledType>``;

export const StyledBody = styled.div<styledType>`
  ${tw`flex-grow-[1] w-11/12 bg-red-200`}
  background-color: #fafafa;
  box-shadow: inset 4px 4px 10px -1px rgba(0, 0, 0, 0.25),
    inset -4px -4px 10px -1px rgba(255, 255, 255, 0.25);
`;
