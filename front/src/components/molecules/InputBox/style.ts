import styled, { css } from 'styled-components';

export interface styledLabelType {
  labelWeight?: number;
  labelSize?: string;
}

export interface styledFlexType {
  isRow: boolean;
  containerWidth?: string;
  containerPadding?: string;
}

export const StyledFlex = styled.div<styledFlexType>`
  ${({ isRow }) => {
    if (isRow) {
      return css`
        display: flex;
        justify-content: space-between;
        align-items: center;
      `;
    }
  }}
  padding : ${({ containerPadding }) => containerPadding};
  width: ${({ containerWidth }) => containerWidth};
`;

StyledFlex.defaultProps = {
  containerWidth: '450px',
  containerPadding: '5px',
};

export const StyledLabel = styled.label<styledLabelType>`
  font-weight: ${({ labelWeight }) => labelWeight};
  font-size: ${({ labelSize }) => labelSize};
`;

StyledLabel.defaultProps = {
  labelWeight: 700,
  labelSize: '1rem',
};
