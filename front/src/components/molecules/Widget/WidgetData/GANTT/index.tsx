// API & Library
import { MouseEventHandler } from 'react';

// Styles
import { StyledWidgetData, styledType } from '../style';

interface propsType extends styledType {
  url?: string | null;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const GANTT = ({ url, onClick }: propsType) => {
  return (
    <>
      <StyledWidgetData col={2} onClick={onClick}>
        <div>* GANTT *</div>
        <div>{url}</div>
      </StyledWidgetData>
    </>
  );
};
