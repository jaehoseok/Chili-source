import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  width?: number;
  height?: number;
}

export const StyledTokenBox = styled.div<styledType>`
  ${tw`flex flex-col justify-between mx-3`};
  ${({ width }) => `width: ${width}px`};
  ${({ height }) => `height: ${height}px`};
`;

export const StyledInputBtnBox = styled.div`
  ${tw`flex justify-between`}
`;
StyledTokenBox.defaultProps = {
  width: 460,
  height: 380,
};
