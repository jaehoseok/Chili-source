import styled from 'styled-components';

export interface styledType {
  width?: string;
  height?: string;
  backgroundColor?: string;
}

export const StyledSheet = styled.div<styledType>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ backgroundColor }) => backgroundColor};
  box-shadow: 4px 4px 10px -1px rgba(0, 0, 0, 0.25), -4px -4px 10px -1px rgba(255, 255, 255, 0.25);
`;
StyledSheet.defaultProps = {
  width: '100px',
  height: '100px',
  backgroundColor: 'white',
};
