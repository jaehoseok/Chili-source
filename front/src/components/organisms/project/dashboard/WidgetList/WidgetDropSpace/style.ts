import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  isActive?: boolean;
  isHorizontal?: boolean;
}

export const StyledWidgetDropSpace = styled.div<styledType>`
  ${tw`bg-blue-200`}
  ${({ isHorizontal }) => (isHorizontal ? 'width: 100%;' : '')}
  padding: 4px;
  background-color: ${({ isActive }) => (isActive ? 'green' : 'red')};
  transition: 200ms all;
`;
