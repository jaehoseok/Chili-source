import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledUserLoginLoadingPage = styled.div<styledType>`
  ${tw`h-4/5 w-1 m-4 rounded-full bg-gray-200`}
`;
StyledUserLoginLoadingPage.defaultProps = {};
