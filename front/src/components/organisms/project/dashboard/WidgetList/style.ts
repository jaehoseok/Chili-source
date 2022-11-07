import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledWidgetList = styled.div<styledType>`
  ${tw`w-full flex justify-center`}
  flex-flow: wrap;
  background-color: orange;
`;
StyledWidgetList.defaultProps = {};

export const StyledWidgetListColumnContainer = styled.div<styledType>`
  ${tw`flex justify-start`}
`;

export const StyledWidgetListColumn = styled.div<styledType>`
  padding: 8px;
  background-color: white;
  border: 4px solid red;
`;
