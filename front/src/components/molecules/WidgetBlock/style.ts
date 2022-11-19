import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledWidgetBlock = styled.div<styledType>`
  ${tw`flex items-center`}
  margin: 16px;
  padding: 16px;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  border-radius: 32px;
  background-color: #fafafa;
  box-shadow: inset 4px 4px 10px -1px rgba(0, 0, 0, 0.25),
    inset -4px -4px 10px -1px rgba(255, 255, 255, 0.25);
  transition: 0.2s;
  &:hover {
    scale: 1.02;
  }
`;
StyledWidgetBlock.defaultProps = {
  height: '180px',
  width: '400px',
};

export const StyledWidgetBlockLine = styled.div<styledType>`
  ${tw`h-4/5 w-1 m-4 rounded-full bg-gray-200`}
`;

export const StyledWidgetBlockText = styled.div<styledType>`
  ${tw`max-h-full max-w-[50%] flex-grow-[1] overflow-hidden text-base font-bold`}
  text-align: left;
`;
