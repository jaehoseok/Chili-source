import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  fontSize?: string;
  backgroundColor?: string;
  width?: number;
}

export const StyledText = styled.div<styledType>`
  color: ${({ color }) => color};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize};
  font-family: ${({ fontFamily }) => fontFamily};
`;

StyledText.defaultProps = {
  color: '#000000',
  fontWeight: '400',
  fontSize: '1rem',
  fontFamily: 'pretendard',
};

export const StyledFill = styled.div<styledType>`
  ${tw`inline-block`}
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-family: ${({ fontFamily }) => fontFamily};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize};
  ${({ width }) => width && `border-radius: ${width * 0.4}px`};
  ${({ width }) => width && `padding: ${width * 0.2}px ${width * 0.5}px`};
`;

StyledFill.defaultProps = {
  backgroundColor: '#d6d6d6',
  fontFamily: 'pretendard',
  fontWeight: '700',
  fontSize: '0.85rem',
};
