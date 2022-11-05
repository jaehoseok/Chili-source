import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  width?: string;
  fontSize?: string;
}

export const StyledSelect = styled.select<styledType>`
  ${tw`bg-gray-100 border-0 text-gray-900 text-sm rounded-lg py-3 dark:focus:ring-blue-500`}
  width: ${({ width }) => width};
  font-size: ${({ fontSize }) => fontSize};
`;

StyledSelect.defaultProps = {
  width: '15rem',
  fontSize: '0.85rem',
};
