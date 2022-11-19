import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledContainer = styled.div`
  ${tw`w-8/12 flex flex-col justify-center h-full m-auto`}
`;

export const StyledMarginY = styled.div`
  ${tw`my-5`}
`;

export const StyledFlex = styled.div`
  ${tw`flex justify-center w-full mt-12`}
`;

export const StyledFlexBetween = styled.div`
  ${tw`flex justify-between items-center`}
`;

export const StyledFlexItemsCenter = styled.div`
  ${tw`flex items-center gap-20`}
`;

export const StyledFlexColumn = styled.div`
  ${tw`flex-col items-center`}
`;

export const StyledFlexCenter = styled.div`
  ${tw`flex items-center`}
`;

export const StyledFlexColCenter = styled.div`
  ${tw`flex flex-col w-full px-3 items-center justify-center gap-10 relative`}
`;

export const StyledFlexColumnItemsCenter = styled.div`
  ${tw`flex flex-col justify-center items-center text-center`}
`;

export const StyledMarginBottom = styled.div`
  ${tw`mb-3`}
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

export const StyledPadding = styled.div`
  ${tw`px-5 py-10`}
`;

export const StyledH2 = styled.div`
  ${tw`font-bold text-2xl`}
`;
