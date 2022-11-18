import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledContainer = styled.div`
  ${tw`flex h-full justify-center items-center px-2 py-3`}

  border-bottom: 2px solid ${({ theme }) => `${theme.color.primary}`};
`;

export const StyledTap = styled.span`
  ${tw`w-12 h-10 flex justify-center items-center cursor-pointer`}
  border-radius: 50%;
  background-color: ${({ theme }) => `${theme.color.primary}`};
  &:hover {
    backgroud-color: ${({ theme }) => `${theme.button.darkgreen}`};
    transition: all 0.2s linear;
  }
`;

export const StyledFlexMaxWidth = styled.div`
  ${tw`flex items-center justify-between w-full`}
  max-width: 1200px;
`;

export const StyledFlexEvenly = styled.div`
  ${tw`flex justify-evenly w-full`}
`;

export const StyledPosition = styled.div`
  // ${tw`relative`}
  // top: 20px;
`;

export const StyledCursor = styled.div`
  ${tw`cursor-pointer`}
`;

export const StyledHover = styled.div`
  &:hover {
    color: ${({ theme }) => theme.color.bug};
  }
`;

export const StyledPaddingL = styled.div`
  ${tw`pl-3`}
`;
