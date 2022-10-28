import { useState } from 'react';
import { TextArea, styledType } from './style';

interface propsType extends styledType {
  placeholder?: string;
  defaultValue?: string;
}

/**
 *
 * @description
 * TextArea 생성 컴포넌트
 *
 * @param {number}    width         컴포넌트 width [default: 400]
 * @param {number}    height        컴포넌트 height [default: 30]
 * @param {string?}   placeholder   컴포넌트 placeholder [default: '']
 * @param {string?}   defaultValue  컴포넌트에 들어갈 값 [default: '']
 * - React에서는 바닐라 JS와 달리 value가 Read Only여서 수정이 불가능. 대신 defaultValue를 채택 시 수정 가능한 value를 사용할 수 있다.
 * @author dbcs
 */

const index = ({ width, height, placeholder, defaultValue }: propsType) => {
  const [value, setValue] = useState<string>(defaultValue ? defaultValue : '');

  const changeHandler = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <TextArea
      width={width}
      height={height}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={changeHandler}
    ></TextArea>
  );
};

export default TextArea;
