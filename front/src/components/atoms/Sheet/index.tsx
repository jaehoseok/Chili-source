import { ReactNode, MouseEvent } from 'react';
import { StyledSheet, styledType } from './style';

interface propsType extends styledType {
  children?: ReactNode;
}

/**
 * @description
 * 네모 모양 판넬 시트를 만드는 컴포넌트
 *
 * @example
 * // 디폴트 구현
 * <Sheet height="100px"></Sheet>
 *
 * // 이미지 적용 예시
 * <Sheet isShadow={true} width={200px} height={200rem} backgroundColor="red">
 *  <img src={require('assets/logo/logo.png')} alt="이미지" />
 * </Sheet>
 *
 * // 그림자 생성
 * <Sheet isShadow={true} height="100px"></Sheet>
 *
 * // 보더 색 변경
 * <Sheet isShadow={false} height="100px" borderColor="red"></Sheet>
 *
 * @param {string?}  height          - 높이문자열
 * @param {string?}  width           - 넓이문자열
 * @param {boolean?} isShadow        - 그림자 유무
 * @param {string?}  borderColor     - #테두리색 핵사코드
 * @param {string?}  backgroundColor - #배경색 핵사코드
 * @param {string?}  flex            - flex-direction (row, column)
 * @param {string?}  maxWidth        - max-width 설정
 * @param {string?}  minHeight       - min-height 설정
 *
 * @author inte
 */
const index = ({
  width,
  height,
  isShadow,
  backgroundColor,
  children,
  borderColor,
  flex,
  maxWidth,
  minHeight,
  minWidth,
  maxHeight,
  isOverflowXScroll,
  isOverflowYScroll,
  isHover,
}: propsType) => {
  return (
    <>
      <StyledSheet
        width={width}
        height={height}
        isShadow={isShadow}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        flex={flex}
        maxWidth={maxWidth}
        minHeight={minHeight}
        isOverflowXScroll={isOverflowXScroll}
        isOverflowYScroll={isOverflowYScroll}
        isHover={isHover}
        minWidth={minWidth}
        maxHeight={maxHeight}
      >
        {children}
      </StyledSheet>
    </>
  );
};

export default index;
