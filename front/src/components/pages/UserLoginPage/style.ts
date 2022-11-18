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
