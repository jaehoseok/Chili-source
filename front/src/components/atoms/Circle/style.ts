import React, { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

export interface CircleProps {
  children: React.ReactNode;
  height: number;
  backgroundColor: string;
  isDropShadow?: boolean;
  isInnerShadow?: boolean;
  isClickable?: boolean;
  clickEvent?: MouseEventHandler<HTMLDivElement> | null;
}

export const defaultProps: CircleProps = {
  children: '+',
  height: 0,
  backgroundColor: 'white',
  // isProfile: false, // 둘 다 img 태그가 children이 되는 상황에서 프로필사진이 들어가는 Circle과 로고 이미지가 들어가는 Circle을 구분하기 위함
  // isEdit: false, // 프로젝트 설정 페이지의 편집 버튼이 스타일링이 달라서 구분하기 위함
  // isClickable: false, // 클릭 가능한 Circle의 스타일링에 일관성이 부족해서 cursor 옵션을 별도로 지정하기 위함
  isDropShadow: false,
  isInnerShadow: false,
  clickEvent: null,
};

export const Circle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ height }) => height && `width: ${height}px`};
  ${({ height }) => height && `height: ${height}px`};
  background-color: ${(props: CircleProps) =>
    typeof props.children === 'string' ? '#d9d9d9' : 'transparent'};
  font-weight: bold;
  border-radius: 50%;
  box-shadow: none;

  ${props =>
    props.isInnerShadow &&
    css`
      box-shadow: inset 0px 3px 3px #aaa;
    `};
  ${props =>
    props.isDropShadow &&
    css`
      box-shadow: 0px 3px 3px #aaa;
    `}
  ${props =>
    props.isClickable &&
    css`
      cursor: pointer;
    `}
`;
