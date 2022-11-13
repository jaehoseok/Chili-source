import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledWidthFull = styled.div`
  ${tw`w-full`}
`;

export const StyledPadding = styled.div`
  ${tw`py-10 px-20`}
`;

export const StyledMarginBottom = styled.div`
  ${tw`mb-20`}
`;

export const StyledContainer = styled.div`
  ${tw`w-8/12 h-full flex flex-col justify-center m-auto`}
  max-width: 1500px;
`;

export const StyledUserName = styled.div`
  ${tw`pl-20 w-full font-bold`}
  max-width: 280px
`;

export const StyledFlex = styled.div`
  ${tw`w-full mt-12`}
`;

export const StyledFlexCenter = styled.div`
  ${tw`flex flex-col items-center justify-center`}
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
  ${tw`flex w-full`}
`;

export const StyledFlexRowItemsCenter = styled.div`
  ${tw`flex justify-center items-center w-full`}
`;

export const StyledFlexAround = styled.div`
  ${tw`flex justify-around w-full items-center`}
`;

export const StyledWidth70 = styled.div`
  ${tw`flex items-end`}
  width: 70%;
`;

export const StyledFlexRowEnd = styled.div`
  ${tw`flex justify-end`}
`;

export const StyledMarginL = styled.div`
  ${tw`ml-3`}
`;

export const StyledUl = styled.ul`
  ${tw`bg-gray-100 h-full`}
  min-height: 200px;
`;

export const StyledLi = styled.li`
  ${tw`cursor-pointer`}
  &:hover {
    background-color: ${({ theme }) => theme.color.primary};
    color: #ffffff;
  }
`;

export const StyledInputLogo = styled.div`
  input[type='file']::file-selector-button {
    ${tw`h-10 rounded-xl border-0 text-sm py-1.5 px-5 ml-3 mr-5 cursor-pointer`}
  }
`;
