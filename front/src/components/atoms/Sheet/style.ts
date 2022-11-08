import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  isShadow?: boolean;
  width?: string;
  height?: string;
  borderRadius?: string;
  borderColor?: string;
  backgroundColor?: string;
  flex?: string;
  maxWidth?: string;
  minHeight?: string;
  isOverflowXScroll?: boolean;
  isOverflowYScroll?: boolean;
}

export const StyledSheet = styled.div<styledType>`
  ${tw`flex overflow-hidden`}
  flex-direction: ${({ flex }) => flex};
  border-radius: ${({ borderRadius }) => borderRadius};
  ${({ isShadow, borderColor }) =>
    isShadow
      ? 'box-shadow: 4px 4px 10px -1px rgba(0, 0, 0, 0.25), -4px -4px 10px -1px rgba(255, 255, 255, 0.25)'
      : `border: 2px solid ${borderColor}`};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ backgroundColor }) => backgroundColor};
  max-width: ${({ maxWidth }) => maxWidth};
  min-height: ${({ minHeight }) => minHeight};
  ${({ isOverflowXScroll }) =>
    isOverflowXScroll
      ? css`
          overflow-x: scroll;
        `
      : ''};
  ${({ isOverflowYScroll }) =>
    isOverflowYScroll
      ? css`
          overflow-y: scroll;
          &::-webkit-scrollbar {
            width: 8px;
            border-radius: 6px;
            background: rgba(0, 0, 0, 0.4);
          }
          &::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 6px;
          }
        `
      : ''};
`;
StyledSheet.defaultProps = {
  backgroundColor: 'white',
  borderRadius: '20px',
  borderColor: '#d9d9d9',
  flex: 'row',
};
