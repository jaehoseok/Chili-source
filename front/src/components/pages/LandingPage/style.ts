import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledLandingPage = styled.div<styledType>`
  ${tw`m-4`}
`;
StyledLandingPage.defaultProps = {};
