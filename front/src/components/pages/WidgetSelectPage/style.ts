import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledPage = styled.div`
  ${tw`w-full flex flex-col`}
  height: calc(100vh - 92px);
`;
StyledPage.defaultProps = {};

export const StyledHeader = styled.div``;

export const StyledBody = styled.div`
  ${tw`flex justify-center overflow-hidden`}
`;
