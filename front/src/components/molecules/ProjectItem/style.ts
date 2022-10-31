import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  width?: number;
  height?: number;
  logoImg?: string; // 추후 교체예정
  isPinned?: boolean;
}

export const StyledProjectItem = styled.div<styledType>`
  ${tw`flex px-2 py-1.5 border border-gray-200 rounded-md`}
`;

StyledProjectItem.defaultProps = {
  logoImg: '',
  isPinned: false,
};
