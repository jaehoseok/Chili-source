import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledSection = styled.div<styledType>`
  ${tw`flex h-screen w-full overflow-x-scroll`}
`;
StyledSection.defaultProps = {};

export const StyledSectionColumn = styled.div<styledType>`
  ${tw`bg-red-200 overflow-y-scroll`}
  width: 1500px;
`;
StyledSectionColumn.defaultProps = {};
