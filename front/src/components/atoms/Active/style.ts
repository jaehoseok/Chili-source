import styled, { css } from 'styled-components';

export interface styledType {
  activated: boolean;
}

export const StyledActive = styled.div<styledType>`
  ${({ activated }) =>
    activated &&
    css`
      background-color: #a9a9a9;
    `}
`;
