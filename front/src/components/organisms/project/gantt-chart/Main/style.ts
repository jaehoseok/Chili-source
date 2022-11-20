import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledMain = styled.div<styledType>`
  ${tw`w-11/12 flex`}
  height: calc(100vh - 128px);
  max-height: calc(100vh - 128px);
  padding: 8px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.02);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  background-blend-mode: overlay;
  box-shadow: 4px 4px 10px -1px rgba(0, 0, 0, 0.25), -4px -4px 10px -1px rgba(255, 255, 255, 0.25);
`;
