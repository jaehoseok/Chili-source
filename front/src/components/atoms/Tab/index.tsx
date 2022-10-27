import React, { MouseEventHandler } from 'react';
import { StyledTab, StyledTypes } from './style';

interface propTypes extends StyledTypes {
  title: string;
  clickHandler?: MouseEventHandler<HTMLSpanElement>;
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
const index = ({ title, clickHandler, isActivated }: propTypes) => {
  return (
    <StyledTab isActivated={isActivated} onClick={clickHandler}>
      {title}
    </StyledTab>
  );
};

export default index;
