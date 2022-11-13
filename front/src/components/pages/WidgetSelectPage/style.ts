import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledPage = styled.div<styledType>`
  ${tw`flex flex-col h-screen w-full overflow-hidden`}
`;
StyledPage.defaultProps = {};

export const StyledHeader = styled.div<styledType>`
  height: 6rem;
  min-height: 6rem;
`;

export const StyledBody = styled.div<styledType>`
  ${tw`flex overflow-hidden`}
`;
