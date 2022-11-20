import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledGanttData = styled.div`
  ${tw`mt-4 h-full w-full flex flex-col items-center overflow-y-scroll`}

  gap: 16px;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: lightgray;
    background-clip: padding-box;
    border-radius: 100px;

    border: 2px solid transparent;
  }

  &::-webkit-scrollbar-track {
    margin-left: 20px;
    margin-right: 20px;
  }
`;
