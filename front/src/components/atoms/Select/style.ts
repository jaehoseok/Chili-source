import styled from 'styled-components';
import tw from 'twin.macro';

export interface StyledTypes {
  width?: string;
  fontSize?: string;
}

export const StyledSelect = styled.select<StyledTypes>`
  ${tw`bg-gray-100 border-0 text-gray-900 text-sm rounded-lg focus:ring-blue-500  py-2 px-2.5  dark:focus:ring-blue-500`}
  width: ${({ width }) => width};
  font-size: ${({ fontSize }) => fontSize};
`;

StyledSelect.defaultProps = {
  width: '15rem',
  fontSize: '0.85rem',
};
