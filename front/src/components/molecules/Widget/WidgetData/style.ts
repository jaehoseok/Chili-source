import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  col?: number;
  ratio?: string;
  height?: string;
  backgroundColor?: string;
}

/**
 * @param ratio{string} - x/y
 */
export const StyledWidgetData = styled.div<styledType>`
  ${tw`flex flex-col justify-center items-center`}
  width: 210px;
  ${({ ratio }) => {
    if (ratio) {
      const splitRatio = ratio.split('/');
      const blockWidth = (510 - 16 * Number(splitRatio[1])) / Number(splitRatio[1]);
      return `width: ${blockWidth * Number(splitRatio[0]) + 16 * Number(splitRatio[0]) - 16}px;`;
    }
  }}
  height: ${({ height }) => `${height ? height : '120px'}`};
  background-color: ${({ backgroundColor }) => `${backgroundColor}`};
`;

export const StyledWidgetDataLabel = styled.div`
  ${tw`w-full flex justify-center bg-gray-200`}
  padding: 4px;
`;

export const StyledWidgetDataContent = styled.div`
  ${tw`w-full flex-grow-[1] overflow-hidden`}
`;
