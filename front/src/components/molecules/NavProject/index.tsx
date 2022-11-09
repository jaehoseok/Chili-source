import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledImg, StyledNav } from './style';

interface propsType {
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
  const navigate = useNavigate();
  const linkToProjectSelectHandler = () => {
    navigate('/');
  };
  return (
    <>
      <StyledNav>
        <StyledImg onClick={linkToProjectSelectHandler}></StyledImg>
        {children}
      </StyledNav>
    </>
  );
};

export default index;
