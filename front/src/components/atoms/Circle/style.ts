import React, { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../../styles/theme';

export interface CircleProps {
  children: React.ReactNode;
  height: number;
  backgroundColor: string;
  isDropShadow?: boolean;
  isInnerShadow?: boolean;
  isClickable?: boolean;
  clickHandler?: MouseEventHandler<HTMLSpanElement>;
}

export const defaultProps: CircleProps = {
  children: '',
  height: 0,
  backgroundColor: theme.button.gray,
  isDropShadow: false,
  isInnerShadow: false,
  isClickable: false,
  clickHandler: undefined,
};

export const Circle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props: CircleProps) => props.height && `width: ${props.height}px`};
  ${(props: CircleProps) => props.height && `height: ${props.height}px`};
  background-color: ${(props: CircleProps) =>
    typeof props.children === 'string' ? '#d9d9d9' : 'transparent'};
  font-weight: bold;
  border-radius: 50%;
  box-shadow: none;

  ${(props: CircleProps) =>
    props.isInnerShadow &&
    css`
      box-shadow: inset 0px 3px 3px #aaa;
    `};
  ${(props: CircleProps) =>
    props.isDropShadow &&
    css`
      box-shadow: 0px 3px 3px #aaa;
    `}
  ${(props: CircleProps) =>
    props.isClickable &&
    css`
      cursor: pointer;
    `}
`;
