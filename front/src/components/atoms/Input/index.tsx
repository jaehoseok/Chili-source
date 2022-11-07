import { useEffect, useState, useRef, ChangeEvent } from 'react';

import { SetterOrUpdater } from 'recoil';

import { StyledInput, styledType } from './style';

interface propsType extends styledType {
  type?: string;
  placeHolder?: string;
  defaultValue?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSetRecoilState?: SetterOrUpdater<any>;
  recoilParam?: string;
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
const index = ({
  height,
  width,
  type,
  placeHolder,
  defaultValue,
  useSetRecoilState,
  recoilParam,
}: propsType) => {
  const [text, setText] = useState(defaultValue);

  const inputTag = useRef<HTMLInputElement>(null);

  const setInputValue = useSetRecoilState;

  const changeHandler = (e?: ChangeEvent<HTMLInputElement>) => {
    e && setText(e.target.value);

    if (useSetRecoilState && recoilParam)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setInputValue(prevObj => {
        return {
          ...prevObj,
          [recoilParam]: e ? e.target.value : defaultValue ? defaultValue : '',
        };
      });
  };

  useEffect(() => {
    setText(defaultValue);
    changeHandler();
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
        onChange={changeHandler}
        defaultValue={text}
      ></StyledInput>
    </>
  );
};

export default index;
