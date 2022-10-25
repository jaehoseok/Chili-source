import { ReactNode } from 'react';

import { StyledSelect, StyleTypes } from './style';

interface propTypes extends StyleTypes {
  children: ReactNode;
}

/**
 *
 * @description
 * Select 재사용 컴포넌트
 *
 * @param {string?}   width     - 컴포넌트 안에 쓰이는 내용
 * @param {string?}   fontSize  - 폰트 크기 변경, default 시 0.85rem;
 * @param {ReactNode} children  - 자식 컴포넌트를 감싸기 위한 props
 *
 * @author bell
 */
const index = ({ children, width, fontSize }: propTypes) => {
  return (
    <StyledSelect width={width} fontSize={fontSize}>
      {children}
    </StyledSelect>
  );
};

export default index;
