import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledPage = styled.div<styledType>`
  ${tw`h-screen bg-red-200`}
`;
StyledPage.defaultProps = {};

export const StyledHeader = styled.div<styledType>`
  height: 4rem;
  min-height: 4rem;
`;

export const StyledBody = styled.div<styledType>`
  ${tw``}
`;
