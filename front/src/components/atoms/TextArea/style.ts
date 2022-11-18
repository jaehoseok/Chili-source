import styled, { css } from 'styled-components';

import tw from 'twin.macro';
export interface styledType {
  width?: string;
  height?: string;
  nonResize?: boolean;
}

export const TextArea = styled.textarea<styledType>`
  ${tw`bg-gray-100 border border-gray-300`};
  ${({ width }) => width && `width: ${width}`};
  ${({ height }) => height && `height: ${height}`};
  ${({ height }) => height && `border-radius: ${+height.substring(0, height.length - 3) * 0.2}px`};
  ${({ nonResize }) =>
    nonResize &&
    css`
      resize: none;
      height: 70px;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-track {
        background-color: #f5f5f5;
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.color.primary};
        &:hover {
          background-color: ${({ theme }) => theme.color.secondary};
        }
      }
    `}};
  
  outline-style: none;
`;

TextArea.defaultProps = {
  width: '400px',
  height: '30px',
  placeholder: '',
  defaultValue: '',
};
