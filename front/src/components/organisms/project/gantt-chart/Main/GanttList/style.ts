import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledGanttList = styled.div`
  ${tw`flex flex-col items-center overflow-y-auto`}
  width: 320px;
  min-width: 320px;
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: lightgray;
    background-clip: padding-box;
    border-radius: 100px;

    border: 2px solid transparent;
  }
`;

export const StyledMarginTop = styled.div`
  ${tw`mt-4 mb-12`}
`;

export const StyledPadding = styled.div`
  ${tw`py-3 px-5`}
`;

export const StyledH4 = styled.div`
  ${tw`font-bold text-xl`}
`;

export const StyledDescription = styled.div`
  ${tw`font-bold text-sm`}
`;

export const StyledMarginBottom = styled.div`
  ${tw`mb-5`}
`;

export const StyledFlexColCenter = styled.div`
  ${tw`w-full h-full flex flex-col justify-center`}
`;
