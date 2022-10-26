import styled from 'styled-components';
import tw from 'twin.macro';

export interface StyledTypes {
  activated: boolean;
}

export const StyledTab = styled.span<StyledTypes>`
  ${tw`py-3 px-10 border rounded-t-2xl text-xl font-bold text-white `}
  display: inline-block;
  background-color: ${({ theme, activated }) =>
    activated ? theme.color.secondary : theme.color.primary};
  cursor: ${({ activated }) => (activated ? 'none' : 'pointer')};
`;
