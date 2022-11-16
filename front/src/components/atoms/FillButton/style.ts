import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { theme } from 'styles/theme';

export interface styledType {
  width?: string;
  height?: string;
  fontSize?: string;
  backgroundColor?: string;
  hoverColor?: string;
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
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`};

  border: none;
  font-family: 'pretendard';

  color: ${({ fontColor }) => fontColor};
  ${({ isHover, hoverColor }) =>
    isHover &&
    css`
      ${tw`duration-300`};
      &:hover {
        background-color: ${hoverColor};
        color: #ffffff;
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
  fontColor: '#ffffff',
  fontSize: '0.85rem',
  backgroundColor: theme.button.green,
  isHover: false,
  isDisabled: false,
};
