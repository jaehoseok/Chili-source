import { forwardRef, useState, useEffect, useRef, ForwardedRef } from 'react';
import { StyledLabel, StyledContainer, styledLabelType, styledContainerType } from './style';
import TextArea from 'components/atoms/TextArea';
import { SetterOrUpdater } from 'recoil';

interface propsType extends styledContainerType, styledLabelType {
  labelName: string;
  textAreaPlaceHolder?: string;
  textAreaValue?: string;
  textAreaWidth?: string;
  textAreaHeight?: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSetRecoilState?: SetterOrUpdater<any>;
  recoilParam?: string;
  nonResize?: boolean;
}

/**
 * @description
 * TextAreaBox를 생성하는 컴포넌트
 * Row 형태의 TextAreaBox 혹은
 * Column 형태의 TextAreaBox를 생성할 수 있다.
 *
 * @example
 * // flex-column 시
 * <InputBox containerWidth="38rem" containerPadding="20px" inputWidth="30rem" isRow={false} labelName={'이름'}></InputBox>
 * // flex-row 시
 * <InputBox containerWidth="38rem" containerPadding="20px" inputWidth="30rem" isRow={true} labelName={'이름'}></InputBox>
 *
 *
 * @param {string}  labelName               - label 태그에 쓰일 label에 이름
 * @param {string?} labelWeight             - label 태그의 font-weight
 * @param {string?} labelSize               - label 태그의 font-size
 * @param {string?} labelMarginBottom       - label 태그의 margin-bottom
 *
 * @param {boolean} isRow                   - 현재 InputBox의 flex 방향을 지정하는 값, true-> row, false -> column
 * @param {string?} containerWidth          - flex-container의 전체 width
 * @param {string?} containerPadding        - flex-container의 전체 padding
 *
 * @param {string?} textAreaPlaceHolder     - textArea의 placeHolder prop에 들어갈 값
 * @param {string?} textAreaValue           - textArea의 defaultValue prop에 들어갈 값
 * @param {string?} textAreaWidth           - textArea의 width prop에 들어갈 값
 * @param {string?} textAreaValue           - textArea의 height prop에 들어갈 값
 *
 * @author bell
 */
const index = forwardRef<HTMLTextAreaElement, propsType>(
  (
    {
      textAreaValue,
      textAreaPlaceHolder,
      textAreaWidth,
      textAreaHeight,
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
      nonResize,
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

    const [text, setText] = useState(textAreaValue);
    const inputRef = useForwardRef<HTMLTextAreaElement>(ref);

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
        <TextArea
          ref={inputRef}
          width={textAreaWidth}
          height={textAreaHeight}
          placeholder={textAreaPlaceHolder}
          defaultValue={textAreaValue}
          text={text}
          setText={setText}
          useSetRecoilState={useSetRecoilState}
          recoilParam={recoilParam}
          disabled={disabled}
          nonResize={nonResize}
        ></TextArea>
      </StyledContainer>
    );
  },
);

export default index;
