import { useState } from 'react';
import * as S from './style';
import { styledType } from './style';

interface propsType extends styledType {
  placeHolder?: string;
  defaultValue?: string;
}

/**
 *
 * @description
 * TextArea 생성 컴포넌트
 *
 * @param {number}    width         컴포넌트 width [default: 400]
 * @param {number}    height        컴포넌트 height [default: 30]
 * @param {string?}   placeHolder   컴포넌트 placeholder [default: '']
 * @param {string?}   defaultValue  컴포넌트에 들어갈 값 [default: '']
 * - React에서는 바닐라 JS와 달리 value가 Read Only여서 수정이 불가능. 대신 defaultValue를 채택 시 수정 가능한 value를 사용할 수 있다.
 * @author dbcs
 */

const TextArea = ({ ...props }: propsType) => {
  const [value, setValue] = useState<string>(props.defaultValue ? props.defaultValue : '');

  const changeHandler = (e: any) => {
    setValue(e.target.value);
  };
  return <S.TextArea {...props} onChange={changeHandler}></S.TextArea>;
};

TextArea.defaultProps = {
  width: 400,
  height: 30,
  placeHolder: '',
  defaultValue: '',
};

export default TextArea;
