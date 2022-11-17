// API & Library
import { ReactNode, MouseEventHandler } from 'react';

// Styles
import { StyledWidgetData, styledType } from '../style';

interface propsType extends styledType {
  onClick?: MouseEventHandler<HTMLDivElement>;
  children?: ReactNode;
}

export const GANTT = ({ onClick }: propsType) => {
  return (
    <>
      <StyledWidgetData col={2} onClick={onClick}>
        <div>* GANTT *</div>
      </StyledWidgetData>
    </>
  );
};
