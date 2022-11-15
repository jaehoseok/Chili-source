import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledPage = styled.div`
  ${tw`w-full flex flex-col`}
  height: calc(100vh - 100px);
`;

export const StyledHeader = styled.div`
  height: 1rem;
  min-height: 1rem;
`;

export const StyledBody = styled.div`
  ${tw`flex-grow-[1] flex justify-center overflow-hidden`}
`;

export const StyledLetterBox = styled.div`
  ${tw`w-1/12`}
`;
