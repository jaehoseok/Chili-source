import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  isActivated: boolean;
  plus?: boolean;
  type: string;
}

export const StyledXBtn = styled.span<styledType>`
  ${tw`text-white hidden cursor-pointer`}
  &: hover {
    color: ${({ theme, type, isActivated }) =>
      isActivated
        ? type === 'project'
          ? theme.color.primary
          : theme.color.secondary
        : isActivated
        ? theme.color.secondary
        : theme.color.primary};
    transition: color 0.5s;
  }
`;

export const StyledTab = styled.span<styledType>`
  ${tw`mr-2 border rounded-t-2xl text-sm font-bold inline-block text-center relative`}
  padding : 7.5px ${({ plus }) => (plus ? '15px' : '30px')};
  ${({ plus }) =>
    plus
      ? css`
          min-width: 10px;
        `
      : css`
          width: 8rem;
          overflow: clip;
          white-space: nowrap;
          text-overflow: ellipsis;
        `}
  background-color: ${({ theme, type, isActivated }) =>
    type === 'project'
      ? isActivated
        ? theme.color.secondary
        : theme.color.primary
      : isActivated
      ? '#ffffff'
      : theme.color.secondary};
  color: ${({ isActivated, type, theme }) =>
    type === 'project' ? '#ffffff' : isActivated ? theme.color.secondary : '#ffffff'};
  cursor: ${({ isActivated }) => (isActivated ? 'default' : 'pointer')};
  box-shadow: ${({ isActivated }) =>
    isActivated ? 'inset 0px 3px 4px rgba(0, 0, 0, 0.25)' : '0px 1px 5px rgba(0, 0, 0, 0.25)'};
  &:hover ${StyledXBtn} {
    ${tw`inline absolute right-4 text-sm`}
    top: 50%;
    transform: translateY(-50%);
  }
`;
