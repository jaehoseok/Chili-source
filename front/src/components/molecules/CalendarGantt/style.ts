import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledFlex = styled.div`
  ${tw`flex justify-between items-center`}
  &:hover {
    svg {
      visibility: visible;
    }
  }
`;

export const StyledIconCloseBtn = styled.div`
  ${tw`relative`}
  top: 1.8px;
  right: 10px;
  visibility: hidden;
`;

export const StyledFlexEnd = styled.div`
  ${tw`flex justify-end mt-5`}
`;
