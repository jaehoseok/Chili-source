import React from 'react';
import * as S from './style';

const Circle = ({ children, ...props }: S.CircleProps) => {
  // <div>Circle</div>;
  const { height, clickEvent, backgroundColor, isDropShadow, isInnerShadow } = props;
  return <S.Circle {...props}>{children}</S.Circle>;
};

export default Circle;
