import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledContainer = styled.div`
  ${tw`flex w-full justify-center flex-col`}
  width: 1200px;
`;

export const StyledFlex = styled.div`
  ${tw`flex w-full items-center justify-between px-1 py-20 gap-10`}
  overflow-x: scroll;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f5f5f5;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.primary};
    border-radius: 5px;
    &:hover {
      background-color: ${({ theme }) => theme.color.secondary};
    }
  }
}
`;

export const StyledMarginY = styled.div`
  ${tw`my-5`}
`;

export const styledPadding = styled.div`
  ${tw`px-10`}
`;

// export const StyledFlex = styled.div`
//   ${tw`flex justify-center w-full mt-12`}
// `;

export const StyledFlexBetween = styled.div`
  ${tw`flex justify-between items-center`}
`;

export const StyledFlexItmesCenter = styled.div`
  ${tw`flex items-center gap-20`}
`;

export const StyledFlexColCenter = styled.div`
  ${tw`flex flex-col w-full items-center justify-center h-full gap-10`}
`;

export const StyledFlexColumn = styled.div`
  ${tw`flex-col items-center`}
`;

export const StyledWidth100px = styled.div`
  ${tw`inline-block`}
  width: 150px;
`;

export const StyledWidth80 = styled.div`
  ${tw`w-10/12 m-auto`}
`;

export const StyledInlineBlock = styled.div`
  ${tw`inline-block mr-1`}
`;

export const StyledProjectWrapper = styled.div`
  ${tw`overflow-y-scroll px-10 py-5`}
  max-height: 1000px;
`;

export const StyledH4 = styled.div`
  ${tw`font-bold text-xl text-center`}
`;
