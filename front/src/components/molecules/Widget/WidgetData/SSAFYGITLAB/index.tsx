// API & Library
import { MouseEventHandler } from 'react';

// Styles
import { StyledWidgetData, styledType } from '../style';

interface propsType extends styledType {
  url?: string | null;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const SSAFYGITLAB = ({ url, onClick }: propsType) => {
  return (
    <>
      <StyledWidgetData onClick={onClick}>
        <div>* SSAFYGITLAB *</div>
      </StyledWidgetData>
    </>
  );
};
