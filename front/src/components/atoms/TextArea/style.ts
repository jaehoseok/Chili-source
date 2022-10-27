import styled from 'styled-components';

export interface styledType {
  width: number;
  height: number;
}

export const TextArea = styled.input.attrs({
  type: 'text',
})`
  ${(props: styledType) => props.width && `width: ${props.width}px`};
  ${(props: styledType) => props.height && `height: ${props.height}px`};
  background-color: #fbfbfb;
  border: 1px solid #d9d9d9;
  outline-style: none;
  ${(props: styledType) => props.height && `border-radius: ${props.height * 0.2}px`};
`;
