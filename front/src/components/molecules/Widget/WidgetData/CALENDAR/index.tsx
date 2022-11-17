// API & Library
import { ReactNode, MouseEventHandler } from 'react';

// Styles
import { StyledWidgetData, styledType } from '../style';

interface propsType extends styledType {
  url?: string | null;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const CALENDAR = ({ url, onClick }: propsType) => {
  return (
    <>
      <StyledWidgetData col={2} onClick={onClick}>
        <div>* CALENDAR *</div>
        <div>{url}</div>
      </StyledWidgetData>
    </>
  );
};
