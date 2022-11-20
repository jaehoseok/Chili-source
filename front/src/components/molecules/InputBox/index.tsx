import { forwardRef, ForwardedRef, useRef, useEffect, useState } from 'react';
import { StyledLabel, StyledContainer, styledLabelType, styledContainerType } from './style';
import Input from 'components/atoms/Input';
import { SetterOrUpdater } from 'recoil';

interface propsType extends styledContainerType, styledLabelType {
  labelName: string;
  inputPlaceHolder?: string;
  inputValue?: string;
  inputHeight?: string;
  inputWidth?: string;
  inputType?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSetRecoilState?: SetterOrUpdater<any>;
  recoilParam?: string;
  disabled?: boolean;
}

/**
 * @description
 * InputBox를 생성하는 컴포넌트
 * Row 형태의 InputBox 혹은
 * Column 형태의 InputBox를 생성할 수 있다.
 *
 * @example
 * // flex-column 시
 * <InputBox containerWidth="38rem" containerPadding="20px" inputWidth="30rem" isRow={false} labelName={'이름'}></InputBox>
 * // flex-row 시
 * <InputBox containerWidth="38rem" containerPadding="20px" inputWidth="30rem" isRow={true} labelName={'이름'}></InputBox>
 *
 * @param {string?} inputHeight       - Input에 쓰일 height props
 * @param {string?} inputWidth        - Input에 쓰일 width props
 * @param {string?} inputValue        - Input에 쓰일 value props
 * @param {string?} inputType         - Input에 쓰일 type props
 * @param {string?} inputPlaceHolder  - Input에 쓰일 placeHolder props
 *
 * @param {string}  labelName         - label 태그에 쓰일 label에 이름
 * @param {string?} labelWeight       - label 태그의 font-weight
 * @param {string?} labelSize         - label 태그의 font-size
 * @param {string?} labelMarginBottom - label 태그의 margin-bottom
 *
 * @param {boolean} isRow             - 현재 InputBox의 flex 방향을 지정하는 값, true-> row, false -> column
 * @param {string?} containerWidth    - flex-container의 전체 width
 * @param {string?} containerPadding  - flex-container의 전체 padding
 *
 * @author bell
 */

const index = forwardRef<HTMLInputElement, propsType>(
  (
    {
      inputHeight,
      inputWidth,
      inputValue,
      inputType,
      inputPlaceHolder,
      labelName,
      labelSize,
      labelWeight,
      labelMarginBottom,
      isRow,
      containerWidth,
      containerPadding,
      useSetRecoilState,
      recoilParam,
      disabled,
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

    const [text, setText] = useState(inputValue);
    const inputRef = useForwardRef<HTMLInputElement>(ref);

    return (
      <StyledContainer
        isRow={isRow}
        containerPadding={containerPadding}
        containerWidth={containerWidth}
      >
        <StyledLabel
          isRow={isRow}
          labelSize={labelSize}
          labelWeight={labelWeight}
          labelMarginBottom={labelMarginBottom}
        >
          {labelName}
        </StyledLabel>
        <Input
          ref={inputRef}
          height={inputHeight}
          width={inputWidth}
          type={inputType}
          placeHolder={inputPlaceHolder}
          defaultValue={inputValue}
          text={text}
          setText={setText}
          useSetRecoilState={useSetRecoilState}
          recoilParam={recoilParam}
          disabled={disabled}
        ></Input>
      </StyledContainer>
    );
  },
);

export default index;
