import styled from 'styled-components';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledWidgetBlock = styled.div<styledType>`
  display: flex;
  align-items: center;
  margin: 16px;
  padding: 16px;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  border-radius: 32px;
  background-color: #fafafa;
  box-shadow: inset 4px 4px 10px -1px rgba(0, 0, 0, 0.25),
    inset -4px -4px 10px -1px rgba(255, 255, 255, 0.25);
`;
StyledWidgetBlock.defaultProps = {
  height: '180px',
  width: '400px',
};

export const StyledWidgetBlockLine = styled.div<styledType>`
  margin: 16px;
  height: 80%;
  width: 4px;
  border-radius: 2px;
  background-color: #e3e3e3;
`;

export const StyledWidgetBlockText = styled.div<styledType>`
  display: flex;
  align-items: center;
  max-width: 50%;
  max-height: 100%;
  font-size: 12pt;
  font-weight: bold;

  overflow: hidden;
`;
