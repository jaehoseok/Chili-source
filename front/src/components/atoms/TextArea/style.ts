import React from 'react';

import styled from 'styled-components';

export interface TextAreaProps {
  children: React.ReactNode;
  width: number;
  height: number;
  value?: string;
  placeHolder?: string;
}

export const defaultProps: TextAreaProps = {
  children: '',
  width: 0,
  height: 0,
  value: '',
  placeHolder: '',
};

export const TextArea = styled.input`
  ${({ width }) => width && `width: ${width}px`};
  ${({ height }) => height && `height: ${height}px`};
  background-color: #d9d9d9;
  border: 1px solid black;
`;
