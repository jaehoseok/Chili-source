import { useState } from 'react';
import { styledType } from './style';

type propsType = styledType;

export const Input = (props: propsType) => {
  const [text, setText] = useState('');

  return <></>;
};

export const FileInput = (props: propsType) => {
  const onReset = () => {
    console.log('리셋 테스트');
  };

  return (
    <>
      {' '}
      <input placeholder="이름" />
      <input placeholder="닉네임" />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        이름 (닉네임)
      </div>
    </>
  );
};
