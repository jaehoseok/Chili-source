import React, { MouseEventHandler } from 'react';

import { StyledCircle, styledType } from './style';

interface propsType extends styledType {
  children?: React.ReactNode;
  clickHandler?: MouseEventHandler<HTMLSpanElement>;
}

/**
 *
 * @description
 * Circle 생성 컴포넌트
 *
 * @param {ReactNode?}                             children        - Circle 안에 들어갈 내용
 * @param {number?}                                height          - Circle 지름 [default: 50]
 * @param {string?}                                backgroundColor - Circle 배경 색 [default: theme.button.gray]
 * @param {boolean?}                               isDropShadow    - Drop Shadow 효과 여부 [default: false]
 * @param {boolean?}                               isInnerShadow   - Inner Shadow 효과 여부 [default: false]
 * @param {boolean?}                               isClickable     - Circle 클릭 효과 여부 [default: false]
 * @param {MouseEventHandler<HTMLSpanElement>?}    clickHandler    - Circle 클릭 이벤트 [default: undefined]
 * @param {boolean?}                               isImage         - image가 들어오는 지 아닌지 확인
 * @param {url?}                                   url             - 가져오는 image의 경로의 값
 * @author dbcs
 */

const index = ({
  children,
  height,
  backgroundColor,
  fontColor,
  fontWeight,
  margin,
  isDropShadow,
  isInnerShadow,
  isClickable,
  isImage,
  url,
  clickHandler,
}: propsType) => {
  return (
    <StyledCircle
      height={height}
      backgroundColor={backgroundColor}
      fontColor={fontColor}
      fontWeight={fontWeight}
      margin={margin}
      isDropShadow={isDropShadow}
      isInnerShadow={isInnerShadow}
      isClickable={isClickable}
      isImage={isImage}
      url={url}
      onClick={clickHandler}
    >
      {children}
    </StyledCircle>
  );
};

export default index;
