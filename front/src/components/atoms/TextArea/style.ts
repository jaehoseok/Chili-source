import styled from 'styled-components';

import tw from 'twin.macro';
export interface styledType {
  width?: string;
  height?: string;
}

export const TextArea = styled.textarea<styledType>`
  ${tw`bg-gray-100 border border-gray-300`};
  ${({ width }) => width && `width: ${width}`};
  ${({ height }) => height && `height: ${height}`};
  ${({ height }) => height && `border-radius: ${+height.substring(0, height.length - 3) * 0.2}px`};
  outline-style: none;
`;

TextArea.defaultProps = {
  width: '400px',
  height: '30px',
  placeholder: '',
  defaultValue: '',
};
