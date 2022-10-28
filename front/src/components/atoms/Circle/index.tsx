import React, { MouseEventHandler } from 'react';

import * as S from './style';
import { styledType } from './style';
import { theme } from '../../../styles/theme';

/**
 *
 * @description
 * Circle 생성 컴포넌트
 *
 * @param {ReactNode}                             children        Circle 안에 들어갈 내용
 * @param {number}                                height          Circle 지름 [default: 50]
 * @param {string}                                backgroundColor Circle 배경 색 [default: theme.button.gray]
 * @param {boolean?}                              isDropShadow    Drop Shadow 효과 여부 [default: false]
 * @param {boolean?}                              isInnerShadow   Inner Shadow 효과 여부 [default: false]
 * @param {boolean?}                              isClickable     Circle 클릭 효과 여부 [default: false]
 * @param {MouseEventHandler<HTMLSpanElement>?}   clickHandler    Circle 클릭 이벤트 [default: undefined]
 *
 * @author dbcs
 */
interface propsType extends styledType {
  children: React.ReactNode;
  clickHandler?: MouseEventHandler<HTMLSpanElement>;
}

const Circle = ({ children, ...props }: propsType) => {
  return (
    <S.Circle onClick={props.clickHandler} {...props}>
      {children}
    </S.Circle>
  );
};

Circle.defaultProps = {
  children: '',
  height: 50,
  backgroundColor: theme.button.gray,
  isDropShadow: false,
  isInnerShadow: false,
  isClickable: false,
  clickHandler: undefined,
};

export default Circle;
