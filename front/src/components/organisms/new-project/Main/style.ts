import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledContainer = styled.div`
  ${tw`w-8/12 flex flex-col justify-center m-auto`}
  max-width: 1200px;
`;

export const StyledInputBox = styled.div`
  ${tw`w-full flex flex-col justify-center items-center`}
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

export const StyledFlexAround = styled.div`
  ${tw`flex justify-around w-full items-center`}
`;

export const StyledWidth70 = styled.div`
  ${tw`flex items-end`}
  width: 70%;
  input[type='file']::file-selector-button {
    ${tw`h-10 rounded-xl border-0 text-sm py-1.5 px-5 ml-3 mr-5 cursor-pointer`}
  }
`;

export const StyledFlexRowEnd = styled.div`
  ${tw`flex justify-end`}
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

export const StyledSliderContainer = styled.div`
  .slick-prev:before,
  .slick-next:before {
    font-size: 2rem;
    color: ${({ theme }) => theme.color.primary};
  }

  .slick-prev {
  }
`;

export const StyledPadding = styled.div`
  ${tw`px-10 py-20`}
`;

export const StyledFlexColCenter = styled.div`
  ${tw`flex flex-col w-full justify-center items-center`}
  padding: 50px 100px;
  text-align: center;
`;
