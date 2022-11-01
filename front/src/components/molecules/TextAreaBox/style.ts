import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export interface styledContainerType {
  isRow: boolean;
  containerWidth?: string;
  containerPadding?: string;
}

export interface styledLabelType {
  isRow: boolean;
  labelWeight?: number;
  labelSize?: string;
  labelMarginBottom?: string;
}

export const StyledContainer = styled.div<styledContainerType>`
  ${({ isRow }) =>
    isRow &&
    css`
      display: flex;
      justify-content: space-between;
    `}
  width: ${({ containerWidth, isRow }) => isRow && containerWidth};
  padding: ${({ containerPadding }) => containerPadding};
`;

StyledContainer.defaultProps = {
  containerWidth: '450px',
  containerPadding: '5px',
};

export const StyledLabel = styled.label<styledLabelType>`
  ${tw`block`}
  font-weight: ${({ labelWeight }) => labelWeight};
  font-size: ${({ labelSize }) => labelSize};
  margin-bottom: ${({ isRow, labelMarginBottom }) => !isRow && labelMarginBottom};
`;

StyledLabel.defaultProps = {
  labelWeight: 700,
  labelSize: '1rem',
};
