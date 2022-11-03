import React, { MouseEventHandler, ReactNode } from 'react';
import { StyledTab, styledType, StyledXBtn } from './style';

interface propsType extends styledType {
  key?: number;
  title: string | ReactNode;
  xBtn: boolean;
  toggleHandler?: MouseEventHandler<HTMLSpanElement>;
  closeHandler?: MouseEventHandler<HTMLSpanElement>;
  createHandler?: MouseEventHandler<HTMLSpanElement>;
}

/**
 *
 * @description
 * Tab 재사용 컴포넌트
 *
 * @param {key}                       key               - map()용 key 값, props로 반영되진 않는다.
 * @param {type}                      type              - 해당 탭이 프로젝트인지, 위젯인지 확인하기 위한 값, 타입에 따라 css가 다르게 적용되는 부분이 있다.
 * @param {string}                    title             - 컴포넌트 안에 쓰이는 내용
 * @param {MouseEventHandler<T>?}     toggleHandler     - 탭 활성화, 비활성화 이벤트 반영
 * @param {MouseEventHandler<T>?}     closeHandler      - 탭 삭제 이벤트 반영
 * @param {MouseEventHandler<T>?}     selectHandler     - + 탭 클릭시, 새로운 프로젝트 혹은 위젯 생성 이벤트
 * @param {boolean}                   isActivated       - 현재 Tab이 켜져있는지 꺼져있는지를 확인하는 prop
 *
 * @author bell
 */
const index = ({
  title,
  type,
  isActivated,
  plus,
  xBtn,
  toggleHandler,
  closeHandler,
  createHandler,
}: propsType) => {
  return (
    <StyledTab
      type={type}
      isActivated={isActivated}
      onClick={title == '+' ? createHandler : toggleHandler}
      plus={plus}
    >
      {title}
      {xBtn && (
        <StyledXBtn type={type} isActivated={isActivated} onClick={closeHandler}>
          X
        </StyledXBtn>
      )}
    </StyledTab>
  );
};

export default index;
