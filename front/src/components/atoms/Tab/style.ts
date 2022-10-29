import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  isActivated: boolean;
}

export const StyledXBtn = styled.span<styledType>`
  ${tw`text-white hidden`}
  &: hover {
    color: ${({ theme, isActivated }) =>
      isActivated ? theme.color.primary : theme.color.secondary};
    transition: color 0.5s;
  }
`;

export const StyledTab = styled.span<styledType>`
  ${tw`py-1.5 px-7 border rounded-t-2xl text-lg font-bold text-white inline-block text-center relative`}
  background-color: ${({ theme, isActivated }) =>
    isActivated ? theme.color.secondary : theme.color.primary};
  cursor: ${({ isActivated }) => (isActivated ? 'default' : 'pointer')};
  box-shadow: ${({ isActivated }) =>
    isActivated ? 'none' : 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)'};
  min-width: 150px;
  &:hover ${StyledXBtn} {
    ${tw`inline absolute right-4 text-sm`}
    top: 50%;
    transform: translateY(-50%);
  }
`;
