import { ReactNode } from 'react';
import { StyledNav, styledType } from './style';

interface propsType extends styledType {
  children?: ReactNode;
}

const index = ({ children }: propsType) => {
  return <StyledNav>{children}</StyledNav>;
};

export default index;
