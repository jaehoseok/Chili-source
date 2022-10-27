import * as S from './style';

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
 * @param {MouseEventHandler<HTMLSpanElement>?}   clickHandler    Circle 클릭 이벤트 [default: false]
 *
 * @author dbcs
 */

const Circle = ({ children, ...props }: S.CircleProps) => {
  return (
    <S.Circle onClick={props.clickHandler} {...props}>
      {children}
    </S.Circle>
  );
};
Circle.defaultProps = S.defaultProps;

export default Circle;
