import { ReactNode, forwardRef, ForwardedRef, useRef, useEffect } from 'react';

import { StyledSelect, styledType } from './style';

interface propsType extends styledType {
  children: ReactNode;
  text?: any;
  setText?: any;
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

export default index;
