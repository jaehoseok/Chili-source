import * as S from './style';

const TextArea = ({ ...props }: S.TextAreaProps) => {
  return <S.TextArea {...props}></S.TextArea>;
};

TextArea.defaultProps = S.defaultProps;

export default TextArea;
