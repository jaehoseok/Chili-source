import { ReactNode } from 'react';
import { StyledImg, StyledNav, styledType } from './style';

interface propsType extends styledType {
  children?: ReactNode;
}

/**
 * @description
 * 프로젝트 탭을 관리하는 컴포넌트
 *
 * @param {ReactNode?} children       - 탭 컴포넌트
 *
 * @author bell
 */
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
