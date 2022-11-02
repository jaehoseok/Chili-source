import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { theme } from '../../../styles/theme';

export interface styledType {
  height?: string;
  backgroundColor?: string;
  isDropShadow?: boolean;
  isInnerShadow?: boolean;
  isClickable?: boolean;
}

export const Circle = styled.span<styledType>`
  ${tw`flex justify-center items-center rounded-full font-bold shadow-none`};

  ${({ height }) => height && `width: ${height}`};
  ${({ height }) => height && `height: ${height}`};
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`};
  ${({ isInnerShadow }) =>
    isInnerShadow &&
    css`
      box-shadow: inset 0px 3px 3px #aaa;
    `};
  ${({ isDropShadow }) =>
    isDropShadow &&
    css`
      box-shadow: 0px 3px 3px #aaa;
    `}
  ${({ isClickable }) =>
    isClickable &&
    css`
      ${tw`cursor-pointer`};
    `}
`;

Circle.defaultProps = {
  children: '',
  height: '50px',
  backgroundColor: theme.button.gray,
  isDropShadow: false,
  isInnerShadow: false,
  isClickable: false,
};
