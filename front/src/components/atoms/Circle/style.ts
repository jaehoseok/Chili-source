import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { theme } from '../../../styles/theme';

export interface styledType {
  height?: string;
  backgroundColor?: string;
  fontColor?: string;
  fontWeight?: string;
  margin?: string;
  isDropShadow?: boolean;
  isInnerShadow?: boolean;
  isClickable?: boolean;
  isImage?: boolean;
  url?: string;
}

// google img를 circle에 가져오는 경우, 외부경로 설정에 따라
// 해당 경로의 이미지를 못가져오는 에러가 발생하는 경우가 있다.
export const StyledCircle = styled.span.attrs({
  referrerpolicy: 'no-referrer',
})<styledType>`
  ${tw`flex justify-center items-center rounded-full font-bold shadow-none m-0`};

  ${({ height }) => height && `width: ${height}`};
  ${({ height }) => height && `height: ${height}`};
  ${({ height }) => height && `min-width: ${height}`};
  ${({ height }) => height && `min-height: ${height}`};
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`};
  ${({ margin }) => margin && `margin: ${margin}`}
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
  ${({ isImage, url }) =>
    isImage &&
    css`
      background-image: url(${url});
      background-position: center, center;
      background-size: 100% 100%;
      object-fit: fill;
    `}
`;

StyledCircle.defaultProps = {
  children: '',
  height: '50px',
  backgroundColor: theme.button.gray,
  isDropShadow: false,
  isInnerShadow: false,
  isClickable: false,
  margin: '0px',
  fontColor: 'black',
  fontWeight: 'normal',
};
