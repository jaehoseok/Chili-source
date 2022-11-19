import {
  ReactNode,
  forwardRef,
  ForwardedRef,
  useRef,
  useEffect,
  useState,
  SetStateAction,
  Dispatch,
} from 'react';

import { StyledLabel, StyledContainer, styledLabelType, styledContainerType } from './style';

import Select from 'components/atoms/Select';

interface propsType extends styledLabelType, styledContainerType {
  labelName: string;
  selectWidth?: string;
  selectSize?: string;
  children?: ReactNode;
  setState?: Dispatch<SetStateAction<string>>;
}

/**
 * @description
 * SelectBox를 생성하는 컴포넌트


 * @example
 * <SelectBox labelName="이슈유형" selectWidth="30rem">
 *  <Option messages={['스토리', '태스크', '버그']}></Option>
 * </SelectBox>
 *
 * @param {string}  labelName         - label 태그에 쓰일 label에 이름
 * @param {string?} labelWeight       - label 태그의 font-weight
 * @param {string?} labelSize         - label 태그의 font-size
 * @param {string?} labelMarginBottom - label 태그의 margin-bottom
 *
 * @param {string?} selectWidth       - select 태그의 width
 * @param {string?} selectSize        - select 태그 및 option 태그의 font 크기
 * @param {string?} children          - Select 컴포넌트가 이어받을 children 컴포넌트 (<option>)
 *
 * @author bell
 */
const index = forwardRef<HTMLSelectElement, propsType>(
  (
    {
      labelName,
      labelSize,
      labelWeight,
      labelMarginBottom,
      selectWidth,
      selectSize,
      containerPadding,
      children,
      setState,
    },
    ref,
  ) => {
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
    const [text, setText] = useState('');
    const inputRef = useForwardRef<HTMLSelectElement>(ref);
    return (
      <StyledContainer containerPadding={containerPadding}>
        <StyledLabel
          labelSize={labelSize}
          labelWeight={labelWeight}
          labelMarginBottom={labelMarginBottom}
        >
          {labelName}
        </StyledLabel>
        <Select
          width={selectWidth}
          fontSize={selectSize}
          children={children}
          ref={inputRef}
          text={text}
          setText={setText}
          setState={setState}
        ></Select>
      </StyledContainer>
    );
  },
);

export default index;
