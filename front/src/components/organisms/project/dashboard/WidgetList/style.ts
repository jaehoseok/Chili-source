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

  max-width: 1200px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 32px;

  background-color: rgba(0, 0, 0, 0.02);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  background-blend-mode: overlay;
  box-shadow: 4px 4px 10px -1px rgba(0, 0, 0, 0.25), -4px -4px 10px -1px rgba(255, 255, 255, 0.25);

  &::-webkit-scrollbar {
    height: 10px; /*스크롤바의 너비*/
  }

  &::-webkit-scrollbar-thumb {
    background-color: lightgray;
    background-clip: padding-box;
    border-radius: 100px;

    border: 2px solid transparent;
  }

  &::-webkit-scrollbar-track {
    margin-left: 32px;
    margin-right: 32px;
  }
`;

export const StyledWidgetListColumnContainer = styled.div<styledType>`
  ${tw`flex justify-center`}
`;

export const StyledWidgetListColumn = styled.div<styledType>`
  padding: 8px;
  background-color: white;
`;
