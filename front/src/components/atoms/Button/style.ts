import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  width?: number;
  height?: number;
  fontSize?: string;
  backgroundColor?: string;
  borderColor?: string;
  isHover?: boolean;
  isDisabled?: boolean;
}

export const Button = styled.button<styledType>`
  ${tw`border border-solid cursor-pointer`};
  ${({ width }) => width && `width: ${width}px`};
  ${({ height }) => height && `height: ${height}px`};
  ${({ height }) => height && `border-radius: ${height * 0.3}px`};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}  `};
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`};
  ${({ borderColor }) => borderColor && `border-color: ${borderColor}`};

  color: ${({ backgroundColor, borderColor }) =>
    !backgroundColor ? borderColor : backgroundColor === '#F8F8F8' ? '#000000' : '#FFFFFF'};
  ${({ isHover, borderColor }) =>
    isHover &&
    css`
      ${tw`duration-300`};
      &:hover {
        background-color: ${borderColor};
        color: ${borderColor ? '#FFFFFF' : '#000000'};
        ${tw`duration-300`};
      }
    `};
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      ${tw`cursor-not-allowed pointer-events-none`};
      border-color: ${({ theme }) => theme.button.gray};
      color: ${({ theme }) => theme.button.gray};
    `};
`;

Button.defaultProps = {
  children: '',
  width: 100,
  height: 40,
  fontSize: '0.85rem',
  backgroundColor: '#FFFFFF',
  borderColor: '#FFFFFF',
  isHover: false,
  isDisabled: false,
};
