import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledWidget = styled.div<styledType>`
  ${tw`flex justify-center items-center`}
`;

export const StyledWidgetData = styled.div<styledType>`
  ${tw`flex justify-center items-center`}
  height: ${({ height }) => height};
  width: ${({ width }) => width};
`;
StyledWidgetData.defaultProps = {
  height: '180px',
  width: '400px',
};
