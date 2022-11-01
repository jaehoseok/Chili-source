import { useState } from 'react';
import { StyledInput, styledType } from './style';

interface propsType extends styledType {
  type?: string;
  placeHolder?: string;
  value?: string;
}

/**
 * @description
 * 인풋 박스를 만드는 컴포넌트
 *
 * @example
 * // 일반적인 사용예시
 * <Input type="text" width={200px} height={200rem} placeHolder="입력해주세요" value="초기값" />
 *
 * @param {string?} height      - 높이문자열
 * @param {string?} width       - 넓이문자열
 * @param {string?} type        - 인풋 타입
 * @param {string?} placeHolder - 플레이스홀더
 * @param {string?} value       - 초기에 들어가있을 값
 *
 * @author inte
 */
const index = ({ height, width, type, placeHolder, value }: propsType) => {
  const [text, setText] = useState(value);

  return (
    <>
      <StyledInput
        height={height}
        width={width}
        type={type}
        placeholder={placeHolder}
        onChange={e => {
          setText(e.target.value);
        }}
        value={text}
      ></StyledInput>
    </>
  );
};

export default index;
