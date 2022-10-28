import React, { MouseEventHandler } from 'react';
import { StyledTab, styledType, StyledXBtn } from './style';

interface propsType extends styledType {
  key: number;
  title: string;
  toggleHandler: MouseEventHandler<HTMLSpanElement>;
  closeHandler?: MouseEventHandler<HTMLSpanElement>;
}

/**
 *
 * @description
 * Tab 재사용 컴포넌트
 *
 * @param {string}                    title         - 컴포넌트 안에 쓰이는 내용
 * @param {MouseEventHandler<T>?}     clickHandler  - 클릭 이벤트 반영
 * @param {boolean}                   activated     - 현재 Tab이 켜져있는지 꺼져있는지를 확인하는 prop
 *
 * @author bell
 */
const index = ({ title, isActivated, toggleHandler, closeHandler }: propsType) => {
  return (
    <StyledTab isActivated={isActivated} onClick={toggleHandler}>
      {title}
      <StyledXBtn isActivated={isActivated} onClick={closeHandler}>
        X
      </StyledXBtn>
    </StyledTab>
  );
};

export default index;
