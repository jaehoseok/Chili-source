import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledWidgetSelectPage = styled.div<styledType>`
  ${tw`flex h-screen w-full overflow-hidden`}
`;
StyledWidgetSelectPage.defaultProps = {};
