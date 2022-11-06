import styled from 'styled-components';

export interface styledType {
  width?: string;
  height?: string;
}

export const StyledInput = styled.input<styledType>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: #fbfbfb;
  border: 1px solid #d9d9d9;
  outline-color: #d9d9d9;
  padding: 10px;
`;
StyledInput.defaultProps = {
  width: '400px',
  height: '30px',
};
