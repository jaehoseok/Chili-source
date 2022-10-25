import React from 'react';
import * as S from './style';

const Button = ({ children, ...props }: S.ButtonProps) => {
  // <div>Button</div>;
  const { width, height, backgroundColor, isHover, isDisabled, clickEvent } = props;

  return <S.Button {...props}>{children}</S.Button>;
};

Button.defaultProps = S.defaultProps;

export default Button;
