import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledMain = styled.div<styledType>`
  ${tw`w-full flex justify-start overflow-hidden`}
`;
