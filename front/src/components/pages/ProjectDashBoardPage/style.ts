import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledPage = styled.div`
  ${tw`h-screen w-screen flex flex-col`}
`;
StyledPage.defaultProps = {};

export const StyledHeaderGap = styled.div`
  height: 6rem;
  min-height: 6rem;
`;

export const StyledBody = styled.div`
  ${tw`flex flex-col items-center flex-1`}
`;

export const StyledSection = styled.div`
  ${tw`w-full flex`}
`;
