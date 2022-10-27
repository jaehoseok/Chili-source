import { MouseEventHandler } from 'react';

import * as S from './style';
import { styledType } from './style';

/**
 *
 * @description
 * Button 생성 컴포넌트
 *
 * @param {ReactNode}                             children        버튼 안에 들어갈 내용
 * @param {number}                                width           버튼 width [default: 100]
 * @param {number}                                height          버튼 height [default: 40]
 * @param {number}                                fontSize        폰트 크기 [default: 20]
 * @param {string}                                backgroundColor 버튼 배경색 [default: #FFFFFF]
 * @param {string}                                borderColor     버튼 테두리색 [default: #FFFFFF]
 * - 특정 경우를 제외하고 color가 borderColor를 따라간다.
 * - backgroundColor가 theme.button.lightgray(=#F8F8F8)일때는 black(=#000000)을 color로 지정
 * @param {boolean}                               isHover         hover 기능 넣을 버튼을 위해 추가한 props [default: false]
 * - hover 시 backgroundColor는 borderColor를 따라간다.
 * - hover 시 borderColor가 props로 주어질 때는 white(=#FFFFFF), 주어지지 않을 때는 black(=#000000)을 color로 지정
 * @param {boolean}                               isDisabled      비활성화 상태임을 나타내기 위해 추가한 props [default: false]
 * - 해당 props 부여 시 borderColor, color가 gray(=#D9D9D9)로 설정되며 클릭이 불가능해진다.
 * @param {MouseEventHandler<HTMLButtonElement>}  clickHandler    버튼 클릭 이벤트 [default: undefined]
 *
 * @author dbcs
 */

interface propsType extends styledType {
  children: React.ReactNode;
  clickHandler: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, ...props }: propsType) => {
  return (
    <S.Button onClick={props.clickHandler} {...props}>
      {children}
    </S.Button>
  );
};

Button.defaultProps = {
  children: '',
  width: 100,
  height: 40,
  fontSize: 20,
  backgroundColor: '#FFFFFF',
  borderColor: '#FFFFFF',
  isHover: false,
  isDisabled: false,
  clickHandler: undefined,
};

export default Button;
