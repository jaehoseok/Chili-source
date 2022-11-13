// API & Library
import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  isActive?: boolean;
}

export const StyledWidgetTrashCan = styled.div<styledType>`
  ${tw`w-full flex justify-center items-center`}
  opacity: ${({ isActive }) => (isActive ? '1' : '0')};
  height: ${({ isActive }) => (isActive ? '12rem' : '1rem')};
  background-color: ${({ isActive }) => (isActive ? 'red' : '')};
  transition: 200ms all;
`;
StyledWidgetTrashCan.defaultProps = {};
