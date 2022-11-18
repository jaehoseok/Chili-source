import styled from 'styled-components';

export interface styledType {
  isActive?: boolean;
  isHorizontal?: boolean;
  isLast?: boolean;
}

export const StyledWidgetDropSpace = styled.div<styledType>`
  display: flex;
  justify-content: center;
  ${({ isActive }) =>
    isActive ? 'min-width: 32px; min-height: 32px;' : 'min-width: 8px; min-height: 8px;'};
  transition: 200ms all;
  ${({ isHorizontal }) => (isHorizontal ? 'width: 100%;' : '')}
  ${({ isLast }) => (isLast ? 'width: 100%; padding-top: 8px;' : '')}
  ${({ isActive }) => (isActive ? 'background-color: lightBlue; padding-top: 32px;' : '')};
`;
