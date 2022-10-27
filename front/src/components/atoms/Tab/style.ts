import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  isActivated: boolean;
}

export const StyledTab = styled.span<styledType>`
  ${tw`py-2 px-8 border rounded-t-2xl text-lg font-bold text-white `}
  display: inline-block;
  background-color: ${({ theme, isActivated }) =>
    isActivated ? theme.color.secondary : theme.color.primary};
  cursor: ${({ isActivated }) => (isActivated ? 'default' : 'pointer')};
`;
