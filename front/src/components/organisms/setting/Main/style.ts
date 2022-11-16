import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledFlexColItemsCenter = styled.div`
  ${tw`flex flex-col items-center justify-center`}
`;

export const StyledFlexRowCenter = styled.div`
  ${tw`flex justify-center`}
`;

export const StyledPadding = styled.div`
  ${tw`p-10 w-full`}
`;

export const StyledMarginY = styled.div`
  ${tw`my-5`}
`;

export const StyledInputLogo = styled.div`
  input[type='file']::file-selector-button {
    ${tw`h-10 rounded-xl border-0 text-sm py-1.5 px-5 ml-3 mr-5 cursor-pointer`}
    &:hover {
      background-color: ${({ theme }) => theme.button.green};
      color: #ffffff;
      transition: all 0.2s linear;
    }
  }
`;
export const StyledFlexRowEnd = styled.div`
  ${tw`flex justify-end`}
`;

export const StyledOverFlowY = styled.div`
  ${tw`overflow-y-scroll w-full`}
`;
