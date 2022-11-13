import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  milliseconds?: number;
  width: string;
  check: boolean;
}

const slideRight = keyframes`
  0% {
    transform: translateX(100%);
  } 
  5% {
    transform: translateX(0);
  }
  95% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;

export const StyledNotfication = styled.div<styledType>`
  ${({ check }) =>
    check
      ? tw`p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 inline-block absolute`
      : tw`p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 inline-block absolute`}
  text-align: center;
  min-width: ${({ width }) => width};
  right: 0;
  top: 100px;
  z-index: 3;
  animation: ${slideRight} ease-in forwards;
  animation-duration: ${({ milliseconds }) => milliseconds && milliseconds / 1000}s;
`;

StyledNotfication.defaultProps = {
  milliseconds: 5000,
};
