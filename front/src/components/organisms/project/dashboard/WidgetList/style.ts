import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledWidgetListContainer = styled.div<styledType>`
  ${tw`w-full flex flex-col items-center`}
`;

export const StyledWidgetList = styled.div<styledType>`
  ${tw`flex-shrink-[1] flex justify-start overflow-x-auto`}
  max-width: 96%;
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 32px;
  background-color: #fafafa;
  box-shadow: inset 4px 4px 10px -1px rgba(0, 0, 0, 0.25),
    inset -4px -4px 10px -1px rgba(255, 255, 255, 0.25);
`;

export const StyledWidgetListColumnContainer = styled.div<styledType>`
  ${tw`flex justify-center`}
`;

export const StyledWidgetListColumn = styled.div<styledType>`
  padding: 8px;
  background-color: white;
`;
