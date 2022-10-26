import styled from 'styled-components';

export interface styledType {
  width?: number;
  height?: number;
}

export const StyledInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  width: ${(props: styledType) => props.width}px;
  height: ${(props: styledType) => props.height}px;
  background-color: #fbfbfb;
  border: 1px solid #d9d9d9;
  padding: 10px;
`;
StyledInputBox.defaultProps = {
  width: 400,
  height: 20,
};

export const StyledInput = styled.input`
  flex-grow: 1;
  border: 0px;
  background-color: #fbfbfb;
  outline-color: #fbfbfb;
`;
StyledInput.defaultProps = {
  width: 20,
  height: 20,
};
