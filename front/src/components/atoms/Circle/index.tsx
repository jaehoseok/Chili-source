import * as S from './style';

const Circle = ({ children, ...props }: S.CircleProps) => {
  return (
    <S.Circle onClick={props.clickHandler} {...props}>
      {children}
    </S.Circle>
  );
};
Circle.defaultProps = S.defaultProps;

export default Circle;
