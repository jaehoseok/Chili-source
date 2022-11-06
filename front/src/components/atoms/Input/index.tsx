import { useEffect, useState, useRef } from 'react';
import { StyledInput, styledType } from './style';

interface propsType extends styledType {
  type?: string;
  placeHolder?: string;
  defaultValue?: string;
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
 * @param {string?} defaultValue       - 초기에 들어가있을 값
 *
 * @author inte
 */
const index = ({ height, width, type, placeHolder, defaultValue }: propsType) => {
  const [text, setText] = useState(defaultValue);

  const inputTag = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setText(defaultValue);
  }, [defaultValue]);
  useEffect(() => {
    if (inputTag.current) {
      inputTag.current.value = text ? text : '';
    }
  }, [text]);
  return (
    <>
      <StyledInput
        ref={inputTag}
        height={height}
        width={width}
        type={type}
        placeholder={placeHolder}
        onChange={e => {
          setText(e.target.value);
        }}
        defaultValue={text}
      ></StyledInput>
    </>
  );
};

export default index;
