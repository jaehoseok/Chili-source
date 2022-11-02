import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  width?: string;
  height?: string;
}

export const StyledTokenBox = styled.div<styledType>`
  ${tw`flex flex-col justify-between mx-3`};
  ${({ width }) => `width: ${width}`};
  ${({ height }) => `height: ${height}`};
`;

export const StyledInputBtnBox = styled.div`
  ${tw`flex justify-between`}
`;
StyledTokenBox.defaultProps = {
  width: '460px',
  height: '380px',
};
