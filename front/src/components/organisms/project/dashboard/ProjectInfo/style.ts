import styled from 'styled-components';
import tw from 'twin.macro';
export interface styledType {
  height?: string;
}

export const StyledProjectInfo = styled.div<styledType>`
  ${tw`w-full flex flex-col items-center`}
`;
StyledProjectInfo.defaultProps = {
  height: '300px',
};

export const StyledProjectInfoLine = styled.div<styledType>`
  height: 2px;
  width: 90%;
  margin: 4px;
  background: gray;
`;
