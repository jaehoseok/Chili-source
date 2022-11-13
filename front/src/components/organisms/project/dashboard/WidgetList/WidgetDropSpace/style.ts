import styled from 'styled-components';

export interface styledType {
  isActive?: boolean;
  isHorizontal?: boolean;
  isLast?: boolean;
}

export const StyledWidgetDropSpace = styled.div<styledType>`
  display: flex;
  justify-content: center;
  ${({ isActive }) => (isActive ? 'padding: 16px;' : 'padding: 8px;')};
  transition: 200ms all;
  ${({ isHorizontal }) => (isHorizontal ? 'width: 100%;' : '')}
  ${({ isLast }) =>
    isLast
      ? 'width: 100%; padding-top: 16px; padding-bottom: 16px; padding-left: 0px; padding-right: 0px;'
      : ''}
  ${({ isActive }) => (isActive ? 'background-color: lightBlue;' : '')};
`;
