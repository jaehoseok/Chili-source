import { ReactNode } from 'react';
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
 * <Sheet />
 *
 * // 사용 예시
 * <Sheet width={200px} height={200rem} backgroundColor="red">
 *  <img src={require('assets/logo/logo.png')} alt="이미지" />
 * </Sheet>
 *
 * @param {string?} height          - 높이문자열
 * @param {string?} width           - 넓이문자열
 * @param {string?} backgroundColor - #배경색핵사코드
 *
 * @author inte
 */
export const Sheet = ({ width, height, backgroundColor, children }: propsType) => {
  return (
    <>
      <StyledSheet width={width} height={height} backgroundColor={backgroundColor}>
        {children}
      </StyledSheet>
    </>
  );
};
