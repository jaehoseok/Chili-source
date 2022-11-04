import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledPage = styled.div`
  ${tw`h-screen w-screen flex flex-col`}
`;
StyledPage.defaultProps = {};

export const StyledBody = styled.div`
  ${tw`flex-grow-[1] flex overflow-hidden`}
`;
StyledBody.defaultProps = {};

export const StyledLetterBox = styled.div`
  ${tw`w-1/12`}
`;
StyledLetterBox.defaultProps = {};
