import React, { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

export interface ButtonProps {
  children: React.ReactNode;
  width: number;
  height: number;
  backgroundColor: string;
  borderColor: string;
  isHover: boolean; // hover 기능 넣을 버튼을 위해 추가한 props
  isDisabled: boolean; // 비활성화 상태임을 나타내기 위해 추가한 props
  clickHandler: MouseEventHandler<HTMLButtonElement>;
}

export const defaultProps = {
  children: '',
  width: 0,
  height: 0,
  backgroundColor: '#FFFFFF',
  borderColor: '#FFFFFF',
  isHover: false,
  isDisabled: false,
  clickHandler: undefined,
};

export const Button = styled.button`
  ${(props: ButtonProps) => props.width && `width: ${props.width}px`};
  ${(props: ButtonProps) => props.height && `height: ${props.height}px`};
  background-color: ${(props: ButtonProps) => props.backgroundColor};
  border: 1px solid ${(props: ButtonProps) => props.borderColor};

  ${(props: ButtonProps) => props.height && `border-radius: ${props.height * 0.3}px`};
  font-size: 10px;
  cursor: pointer;
  color: ${(props: ButtonProps) =>
    props.backgroundColor
      ? props.borderColor
      : props.backgroundColor === '#F8F8F8'
      ? '#000000'
      : '#FFFFFF'};
  ${(props: ButtonProps) =>
    props.isHover &&
    css`
      transition: 0.3s;
      &:hover {
        background-color: ${props.borderColor};
        color: ${props.borderColor ? '#FFFFFF' : '#000000'};
        transition: 0.3s;
      }
    `};
  ${(props: ButtonProps) =>
    props.isDisabled &&
    css`
      border: 1px solid ${({ theme }) => theme.button.gray};
      color: ${({ theme }) => theme.button.gray};
      cursor: not-allowed;
      pointer-events: none;
    `};
`;
