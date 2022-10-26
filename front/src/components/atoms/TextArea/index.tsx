import React from 'react';

import * as S from './style';

const TextArea = ({ children, ...props }: S.TextAreaProps) => {
  return <S.TextArea {...props}>{children}</S.TextArea>;
};

TextArea.defaultProps = S.defaultProps;

export default TextArea;
