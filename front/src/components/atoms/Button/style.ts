import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  width?: string;
  height?: string;
  fontSize?: string;
  backgroundColor?: string;
  borderColor?: string;
  isHover?: boolean;
  isDisabled?: boolean;
}

export const Button = styled.button<styledType>`
  ${tw`flex justify-center items-center border border-solid cursor-pointer`};
  ${({ width }) => width && `width: ${width}`};
  ${({ height }) => height && `height: ${height}`};
  border-radius: 3rem;
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
  width: '100px',
  height: '40px',
  fontSize: '0.85rem',
  backgroundColor: '#FFFFFF',
  borderColor: '#FFFFFF',
  isHover: false,
  isDisabled: false,
};
