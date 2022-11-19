import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledPadding = styled.div`
  ${tw`pt-5`}
`;

export const StyledSpan = styled.span`
  color: ${({ theme }) => theme.color.primary};
`;
