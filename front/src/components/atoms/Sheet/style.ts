import styled from 'styled-components';

export interface styledType {
  width?: number;
  height?: number;
  backgroundColor?: string;
}

export const StyledSheet = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  width: ${(props: styledType) => props.width}px;
  height: ${(props: styledType) => props.height}px;
  background-color: ${(props: styledType) => props.backgroundColor};
  box-shadow: 4px 4px 10px -1px rgba(0, 0, 0, 0.25), -4px -4px 10px -1px rgba(255, 255, 255, 0.25);
`;
StyledSheet.defaultProps = {
  width: 100,
  height: 100,
  backgroundColor: 'white',
};
