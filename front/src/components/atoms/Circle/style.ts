import styled, { css } from 'styled-components';

export interface styledType {
  height: number;
  backgroundColor: string;
  isDropShadow?: boolean;
  isInnerShadow?: boolean;
  isClickable?: boolean;
}

export const Circle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props: styledType) => props.height && `width: ${props.height}px`};
  ${(props: styledType) => props.height && `height: ${props.height}px`};
  ${(props: styledType) => props.backgroundColor && `background-color: ${props.backgroundColor}`};
  font-weight: bold;
  border-radius: 50%;
  box-shadow: none;

  ${(props: styledType) =>
    props.isInnerShadow &&
    css`
      box-shadow: inset 0px 3px 3px #aaa;
    `};
  ${(props: styledType) =>
    props.isDropShadow &&
    css`
      box-shadow: 0px 3px 3px #aaa;
    `}
  ${(props: styledType) =>
    props.isClickable &&
    css`
      cursor: pointer;
    `}
`;
