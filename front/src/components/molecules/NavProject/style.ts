import styled from 'styled-components';
import tw from 'twin.macro';

import logo from 'assets/logo/logo.png';

export const StyledNav = styled.nav`
  ${tw`px-4`}
  background: ${({ theme }) =>
    `linear-gradient(90.05deg, ${theme.color.primary} 35.2%, #6ACF60 53.63%, #85DF4B 76.31%)`};
`;

export const StyledImg = styled.img.attrs({
  src: `${logo}`,
})`
  ${tw`mr-5 inline-block w-10 cursor-pointer`}
  transform : translateY(25%)
`;
