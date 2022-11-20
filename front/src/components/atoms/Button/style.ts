import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  width?: string;
  height?: string;
  fontSize?: string;
  margin?: string;
  backgroundColor?: string;
  borderColor?: string;
  isHover?: boolean;
  isDisabled?: boolean;
  fontColor?: string;
}

export const Button = styled.button<styledType>`
  ${tw`flex justify-center items-center border border-solid cursor-pointer`};
  ${({ width }) => width && `width: ${width}`};
  ${({ height }) => height && `height: ${height}`};
  ${({ height }) => height && `border-radius: ${+height.substring(0, height.length - 2) * 0.2}px`};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}  `};
  ${({ margin }) => margin && `margin: ${margin}`};
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`};
  ${({ borderColor }) => borderColor && `border-color: ${borderColor}`};

  color: ${({ backgroundColor, borderColor }) =>
    backgroundColor === '#FFFFFF'
      ? borderColor
      : backgroundColor === '#F8F8F8'
      ? '#000000'
      : '#FFFFFF'};
  color: ${({ fontColor }) => fontColor};
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
  width: '100px',
  height: '40px',
  fontSize: '0.85rem',
  margin: '0px',
  backgroundColor: '#FFFFFF',
  borderColor: '#FFFFFF',
  isHover: false,
  isDisabled: false,
};
