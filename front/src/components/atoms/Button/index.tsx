import React from 'react';
import * as S from './style';

const Button = ({ children, ...props }: S.ButtonProps) => {
  return <S.Button {...props}>{children}</S.Button>;
};

Button.defaultProps = S.defaultProps;

export default Button;
