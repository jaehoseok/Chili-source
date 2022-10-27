import React, { MouseEventHandler } from 'react';

import styled, { css } from 'styled-components';

export interface ButtonProps {
  children: React.ReactNode;
  width: number;
  height: number;
  fontSize: number;
  backgroundColor: string;
  borderColor: string;
  isHover: boolean;
  isDisabled: boolean;
  clickHandler: MouseEventHandler<HTMLButtonElement>;
}

export const defaultProps = {
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

export const Button = styled.button`
  ${(props: ButtonProps) => props.width && `width: ${props.width}px`};
  ${(props: ButtonProps) => props.height && `height: ${props.height}px`};
  background-color: ${(props: ButtonProps) => props.backgroundColor};
  border: 1px solid ${(props: ButtonProps) => props.borderColor};

  ${(props: ButtonProps) => props.height && `border-radius: ${props.height * 0.3}px`};
  ${(props: ButtonProps) => props.fontSize && `font-size: ${props.fontSize}px`};
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
