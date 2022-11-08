import {
  ReactNode,
  ChangeEvent,
  SetStateAction,
  Dispatch,
  useEffect,
  useState,
  useRef,
  RefObject,
} from 'react';

import { StyledSelect, styledType } from './style';

interface propsType extends styledType {
  children: ReactNode;
  setJiraProject?: Dispatch<SetStateAction<string>>;
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
const index = ({ children, width, fontSize, setJiraProject }: propsType) => {
  // const changeJiraProjectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
  //   console.log(e);
  //   if (setJiraProject) {
  //     const idx = e.target.selectedIndex;
  //     setJiraProject(e.target.options[idx].value);
  //   }
  // };

  // useEffect(() => {
  //   if (setJiraProject) {
  //     setJiraProject('반영은 됨');
  //   }
  // }, []);

  const changeJiraProjectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const idx = e.target.selectedIndex;
    if (setJiraProject) {
      setJiraProject(e.target.options[idx].value);
    }
  };

  return (
    <StyledSelect width={width} fontSize={fontSize} onChange={changeJiraProjectHandler}>
      {children}
    </StyledSelect>
  );
};

export default index;
