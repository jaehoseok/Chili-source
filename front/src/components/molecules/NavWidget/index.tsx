import { ReactNode } from 'react';
import { StyledNav, styledType } from './style';

interface propsType extends styledType {
  children?: ReactNode;
}

/**
 * @description
 * 위젯 탭을 관리하는 컴포넌트
 *
 * @param {ReactNode?} children       - 위젯 탭 컴포넌트
 *
 * @author bell
 */
const index = ({ children }: propsType) => {
  return <StyledNav>{children}</StyledNav>;
};

export default index;
