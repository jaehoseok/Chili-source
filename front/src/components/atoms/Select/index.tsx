<<<<<<< HEAD
import { ReactNode, forwardRef, ForwardedRef, useRef, useEffect } from 'react';
=======
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
>>>>>>> fa3ba9846c6d898da2f45cd795dae5a8dc0268be

import { StyledSelect, styledType } from './style';

interface propsType extends styledType {
  children: ReactNode;
<<<<<<< HEAD
  text?: any;
  setText?: any;
=======
  setJiraProject?: Dispatch<SetStateAction<string>>;
>>>>>>> fa3ba9846c6d898da2f45cd795dae5a8dc0268be
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
<<<<<<< HEAD
const index = forwardRef<HTMLSelectElement, propsType>(
  ({ children, width, fontSize, setText }, ref) => {
    const useForwardRef = <T,>(ref: ForwardedRef<T>, initialValue: any = null) => {
      const targetRef = useRef<T>(initialValue);

      useEffect(() => {
        if (!ref) return;

        if (typeof ref === 'function') {
          ref(targetRef.current);
        } else {
          ref.current = targetRef.current;
        }
      }, [ref]);

      return targetRef;
    };

    const inputRef = useForwardRef<HTMLSelectElement>(ref);
    return (
      <StyledSelect
        ref={inputRef}
        width={width}
        fontSize={fontSize}
        onChange={e => setText(e.target.value)}
      >
        {children}
      </StyledSelect>
    );
  },
);
=======
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
>>>>>>> fa3ba9846c6d898da2f45cd795dae5a8dc0268be

export default index;
