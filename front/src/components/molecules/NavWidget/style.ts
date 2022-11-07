import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  test?: true;
}

export const StyledNav = styled.nav<styledType>`
  ${tw`px-4 pt-2 w-screen`}
  background: ${({ theme }) => `${theme.color.secondary}`};
`;
