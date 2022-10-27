import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  isActivated: boolean;
}

export const StyledTab = styled.span<styledType>`
  ${tw`py-3 px-10 border rounded-t-2xl text-xl font-bold text-white `}
  display: inline-block;
  background-color: ${({ theme, isActivated }) =>
    isActivated ? theme.color.secondary : theme.color.primary};
  cursor: ${({ isActivated }) => (isActivated ? 'none' : 'pointer')};
`;
