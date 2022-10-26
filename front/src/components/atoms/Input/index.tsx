import { ChangeEvent, useState } from 'react';
import { StyledInputBox, StyledInput, styledType } from './style';

interface propsType extends styledType {
  type?: string;
  placeHolder?: string;
  value?: string;
}

/**
 * 인풋 박스를 만드는 컴포넌트
 * @example
 * // 일반적인 사용예시
 * <Input type="text" width={200} height={200} placeHolder="입력해주세요" value="초기값" />
 *
 * @param {number?} height - 높이정수
 * @param {number?} width - 넓이정수
 * @param {string?} type - #인풋 타입
 * @param {string?} placeHolder - #플레이스홀더
 * @param {string?} value - #초기에 들어가있을 값
 * @author inte
 */
export const Input = (props: propsType) => {
  const [value, setValue] = useState(props.value);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <StyledInputBox height={props.height} width={props.width}>
        <StyledInput
          height={props.height}
          width={props.width}
          type={props.type}
          placeholder={props.placeHolder}
          onChange={onChange}
          value={value}
        ></StyledInput>
      </StyledInputBox>
    </>
  );
};

export const FileInput = () => {
  return (
    <>
      <div>테스트 코드</div>
    </>
  );
};
