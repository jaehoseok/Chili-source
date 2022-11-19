import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  height?: string;
  width?: string;
  backgroundColor?: string;
}

export const StyledWidget = styled.div<styledType>`
  ${tw`flex justify-center items-center`}
  transition: all 0.2s ease-in-out;
  &:hover {
    scale: 1.04;
  }
`;

export const StyledWidgetData = styled.div<styledType>`
  ${tw`flex flex-col justify-center items-center`}
  font-size: 1.4rem;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  background-color: ${({ backgroundColor }) => backgroundColor};
`;
StyledWidgetData.defaultProps = {
  height: '180px',
  width: '400px',
};
