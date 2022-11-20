import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledTitle = styled.div`
  color: ${({ theme }) => theme.color.primary};
`;

export const StyledDiv = styled.div`
  ${tw`flex flex-col `}
  height: 100%;
  padding: 10px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 5px;
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
`;
