import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledLabelType {
  labelWeight?: number;
  labelSize?: string;
  labelMarginBottom?: string;
}

export interface styledContainerType {
  containerPadding?: string;
}

export const StyledLabel = styled.label<styledLabelType>`
  ${tw`flex`}
  font-weight: ${({ labelWeight }) => labelWeight};
  font-size: ${({ labelSize }) => labelSize};
  margin-bottom: ${({ labelMarginBottom }) => labelMarginBottom};
`;

StyledLabel.defaultProps = {
  labelWeight: 700,
  labelSize: '1rem',
  labelMarginBottom: '5px',
};

export const StyledContainer = styled.div<styledContainerType>`
  padding: ${({ containerPadding }) => containerPadding};
`;

StyledContainer.defaultProps = {
  containerPadding: '5px',
};
