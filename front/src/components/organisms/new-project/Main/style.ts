import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledContainer = styled.div`
  ${tw`w-8/12 h-full flex flex-col justify-center m-auto`}
  max-width: 2000px;
`;

export const StyledFlex = styled.div`
  ${tw`w-full mt-12`}
`;

export const StyledInputBox = styled.div`
  ${tw`w-full flex flex-col justify-center`}
  padding: 0 100px
`;

export const StyledMarginY = styled.div`
  ${tw`my-4`}
`;

export const StyledLabel = styled.label`
  font-size: 1.3rem;
  font-weight: 700;
`;

export const StyledFlexRow = styled.div`
  ${tw`flex justify-between w-full`}
`;

export const StyledWidth80 = styled.div`
  ${tw`flex items-end`}
  width: 70%;
  input[type='file']::file-selector-button {
    ${tw`h-10 rounded-xl border-0 text-sm py-1.5 px-5 ml-3 mr-5 cursor-pointer`}
  }
`;
