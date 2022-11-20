import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledWidgetBlockContainer = styled.div<styledType>`
  ${tw`w-full flex justify-center overflow-x-scroll`}
  transform:rotateX(180deg);
  -ms-transform: rotateX(180deg);
  -webkit-transform: rotateX(180deg);

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: lightgray;
    background-clip: padding-box;
    border-radius: 100px;

    border: 2px solid transparent;
  }
`;

export const StyledWidgetBlockBox = styled.div<styledType>`
  ${tw`overflow-y-scroll`}
  direction: rtl;
  transform: rotateX(180deg);
  -ms-transform: rotateX(180deg);
  -webkit-transform: rotateX(180deg);

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: lightgray;
    background-clip: padding-box;
    border-radius: 100px;

    border: 2px solid transparent;
  }
`;
