import styled from 'styled-components';
import tw from 'twin.macro';

export interface StyleTypes {
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  fontSize?: string;
  backgroundColor?: string;
  width?: number;
}

export const StyledText = styled.div<StyleTypes>`
  color: ${({ color }) => color || '#000000'};
  font-weight: ${({ fontWeight }) => fontWeight || '400'};
  font-size: ${({ fontSize }) => fontSize || '1rem'};
  font-family: ${({ fontFamily }) => fontFamily || 'pretendard'};
`;

export const StyledFill = styled.div<StyleTypes>`
  ${tw`inline-block`}
  background-color: ${({ backgroundColor }) => backgroundColor || '#d6d6d6'};
  font-family: ${({ fontFamily }) => fontFamily || 'pretendard'};
  font-weight: ${({ fontWeight }) => fontWeight || '700'};
  font-size: ${({ fontSize }) => fontSize || '0.85rem'};
  ${({ width }) => width && `border-radius: ${width * 0.4}px`};
  ${({ width }) => width && `padding: ${width * 0.2}px ${width * 0.5}px`};
`;
