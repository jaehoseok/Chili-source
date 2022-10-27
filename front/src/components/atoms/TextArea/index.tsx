import { useState } from 'react';
import * as S from './style';

/**
 *
 * @description
 * TextArea 생성 컴포넌트
 *
 * @param {number}    width         컴포넌트 width [default: 400]
 * @param {number}    height        컴포넌트 height [default: 30]
 * @param {string?}   placeHolder   컴포넌트 placeholder [default: '']
 *
 * @author dbcs
 */

const TextArea = ({ ...props }: S.TextAreaProps) => {
  const [value, setValue] = useState<string>(props.value ? props.value : '');

  const changeHandler = () => {
    setValue(value);
  };
  return <S.TextArea {...props}></S.TextArea>;
};

TextArea.defaultProps = S.defaultProps;

export default TextArea;
