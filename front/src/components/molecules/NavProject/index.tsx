import { ReactNode } from 'react';
import { StyledImg, StyledNav, styledType } from './style';

interface propsType extends styledType {
  children?: ReactNode;
}

const index = ({ children }: propsType) => {
  return (
    <>
      <StyledNav>
        <StyledImg></StyledImg>
        {children}
      </StyledNav>
    </>
  );
};

export default index;
