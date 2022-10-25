import React, { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

export interface ButtonProps {
  children: React.ReactNode;
  width: number;
  height: number;
  backgroundColor: string;
  isHover: boolean; // hover 기능 넣을 버튼을 위해 추가한 props
  isDisabled: boolean; // 비활성화 상태임을 나타내기 위해 추가한 props
  clickEvent: MouseEventHandler<HTMLDivElement> | null;
}

export const defaultProps = {
  children: '',
  width: 0,
  height: 0,
  backgroundColor: 'white',
  isHover: false,
  isDisabled: false,
  clickEvent: null,
};

export const Button = styled.button`
  ${(props: ButtonProps) => props.width && `width: ${props.width}px`};
  ${(props: ButtonProps) => props.height && `height: ${props.height}px`};
  background-color: ${(props: ButtonProps) => props.backgroundColor};
  border: 1px solid
    ${(props: ButtonProps) => (props.backgroundColor === '#fafafa' ? '#d9d9d9' : '#34a853')};
  ${(props: ButtonProps) => props.height && `border-radius: ${props.height * 0.3}px`};
  font-size: 10px;
  cursor: pointer;
  color: ${(props: ButtonProps) =>
    props.backgroundColor === 'white'
      ? '#34A853'
      : props.backgroundColor === '#34A853'
      ? 'white'
      : 'black'};
  ${props =>
    props.isHover &&
    css`
      transition: 0.3s;
      &:hover {
        background-color: #34a853;
        color: white;
        transition: 0.3s;
      }
    `};
  ${props =>
    props.isDisabled &&
    css`
      border: 1px solid #d9d9d9;
      color: #d9d9d9;
      cursor: not-allowed;
      pointer-events: none;
    `};
`;
