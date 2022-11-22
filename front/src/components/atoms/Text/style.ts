import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  fontSize?: string;
  backgroundColor?: string;
  width?: number;
  display?: string;
  isHover?: boolean;
}

export const StyledText = styled.div<styledType>`
  color: ${({ color }) => color};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize};
  font-family: ${({ fontFamily }) => fontFamily};
  display: ${({ display }) => display};
  ${({ isHover }) =>
    isHover &&
    css`
      cursor: pointer;
      &:hover {
        color: ${({ theme }) => theme.color.primary};
        transition: color 0.2s linear;
      }
    `};
`;

StyledText.defaultProps = {
  fontWeight: '400',
  fontSize: '1rem',
  fontFamily: 'pretendard',
  display: 'inline-block',
  isHover: false,
};

export const StyledFill = styled.div<styledType>`
  ${tw`inline-block`}
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-family: ${({ fontFamily }) => fontFamily};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize};
  ${({ width }) => width && `border-radius: ${width * 0.4}px`};
  ${({ width }) => width && `padding: ${width * 0.2}px ${width * 0.5}px`};
`;

StyledFill.defaultProps = {
  backgroundColor: '#d6d6d6',
  fontFamily: 'pretendard',
  fontWeight: '700',
  fontSize: '0.85rem',
};
