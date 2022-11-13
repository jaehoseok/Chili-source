import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledAside = styled.div`
  ${tw`flex flex-col items-center overflow-y-scroll`}
  width: 300px;
  min-width: 300px;
`;
StyledAside.defaultProps = {};

export const StyledAsideGap = styled.div`
  height: 16px;
  min-height: 16px;
`;
