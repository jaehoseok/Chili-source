import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledContainer = styled.div`
  ${tw`flex h-full justify-between items-center px-2 py-3`}
  border-bottom: 2px solid ${({ theme }) => `${theme.color.primary}`};
`;

export const StyledTap = styled.span`
  ${tw`w-10 h-10 flex justify-center items-center cursor-pointer`}
  border-radius: 20px;
  background-color: ${({ theme }) => `${theme.color.primary}`};
`;

export const StyledFlexWrapper = styled.div`
  ${tw`flex items-center`}
`;

export const StyledText = styled.div`
  ${tw`ml-3 cursor-pointer`}
  &:hover {
    color: ${({ theme }) => `${theme.color.primary}`};
    transition: all 1s;
  }
`;
