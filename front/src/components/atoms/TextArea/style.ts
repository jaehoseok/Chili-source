import styled from 'styled-components';

export interface TextAreaProps {
  width: number;
  height: number;
  placeHolder?: string;
}

export const defaultProps: TextAreaProps = {
  width: 0,
  height: 0,
  placeHolder: '',
};

export const TextArea = styled.input.attrs({
  type: 'text',
})`
  ${(props: TextAreaProps) => props.width && `width: ${props.width}px`};
  ${(props: TextAreaProps) => props.height && `height: ${props.height}px`};
  background-color: #fbfbfb;
  border: 1px solid #d9d9d9;
  outline-style: none;
  ${(props: TextAreaProps) => props.height && `border-radius: ${props.height * 0.2}px`};
`;
