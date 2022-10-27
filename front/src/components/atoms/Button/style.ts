import styled, { css } from 'styled-components';

export interface styledType {
  width: number;
  height: number;
  fontSize: number;
  backgroundColor: string;
  borderColor: string;
  isHover: boolean;
  isDisabled: boolean;
}

export const Button = styled.button`
  ${(props: styledType) => props.width && `width: ${props.width}px`};
  ${(props: styledType) => props.height && `height: ${props.height}px`};
  background-color: ${(props: styledType) => props.backgroundColor};
  border: 1px solid ${(props: styledType) => props.borderColor};

  ${(props: styledType) => props.height && `border-radius: ${props.height * 0.3}px`};
  ${(props: styledType) => props.fontSize && `font-size: ${props.fontSize}px`};
  cursor: pointer;
  color: ${(props: styledType) =>
    props.backgroundColor
      ? props.borderColor
      : props.backgroundColor === '#F8F8F8'
      ? '#000000'
      : '#FFFFFF'};
  ${(props: styledType) =>
    props.isHover &&
    css`
      transition: 0.3s;
      &:hover {
        background-color: ${props.borderColor};
        color: ${props.borderColor ? '#FFFFFF' : '#000000'};
        transition: 0.3s;
      }
    `};
  ${(props: styledType) =>
    props.isDisabled &&
    css`
      border: 1px solid ${({ theme }) => theme.button.gray};
      color: ${({ theme }) => theme.button.gray};
      cursor: not-allowed;
      pointer-events: none;
    `};
`;
