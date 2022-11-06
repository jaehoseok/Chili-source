import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledContainer = styled.div`
  ${tw`w-8/12 flex flex-col justify-center h-full m-auto`}
  max-width: 1500px;
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
