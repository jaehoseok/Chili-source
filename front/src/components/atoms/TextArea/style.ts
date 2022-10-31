import styled from 'styled-components';

import tw from 'twin.macro';
export interface styledType {
  width?: number;
  height?: number;
}

export const TextArea = styled.textarea<styledType>`
  ${tw`bg-gray-100 border border-gray-300`};
  ${({ width }) => width && `width: ${width}px`};
  ${({ height }) => height && `height: ${height}px`};
  ${({ height }) => height && `border-radius: ${+height * 0.2}px`};
  outline-style: none;
`;

TextArea.defaultProps = {
  width: 400,
  height: 30,
  placeholder: '',
  defaultValue: '',
};
