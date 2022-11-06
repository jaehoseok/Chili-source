import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledPage = styled.div`
  ${tw`h-screen w-screen flex flex-col`}
`;
StyledPage.defaultProps = {};

export const StyledHeader = styled.div`
  height: 6rem;
  min-height: 6rem;
`;

export const StyledBody = styled.div`
  ${tw`flex-grow-[1] flex overflow-hidden`}
`;

export const StyledLetterBox = styled.div`
  ${tw`w-1/12`}
`;
