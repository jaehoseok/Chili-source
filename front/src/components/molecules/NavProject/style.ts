import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  test?: true;
}

export const StyledNav = styled.nav<styledType>`
  ${tw`px-4 pt-2`}
  background: ${({ theme }) =>
    `linear-gradient(90.05deg, ${theme.color.primary} 35.2%, #6ACF60 53.63%, #85DF4B 76.31%)`};
`;
