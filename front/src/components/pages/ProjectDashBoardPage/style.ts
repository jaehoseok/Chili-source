import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledPage = styled.div`
  ${tw`w-full flex flex-col overflow-y-scroll`}

  &::-webkit-scrollbar {
    width: 10px; /*스크롤바의 너비*/
  }

  &::-webkit-scrollbar-thumb {
    background-color: lightgray;
    background-clip: padding-box;
    border-radius: 100px;

    border: 2px solid transparent;
  }
`;

export const StyledHeader = styled.div``;

export const StyledBody = styled.div`
  ${tw`flex flex-col items-center flex-1 pt-6`}
`;

export const StyledSection = styled.div`
  ${tw`w-full flex`}
  max-width: 100%;
`;
