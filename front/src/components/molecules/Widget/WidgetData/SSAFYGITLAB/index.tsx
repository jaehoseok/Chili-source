// API & Library
import { ReactNode, MouseEventHandler } from 'react';

// Styles
import { StyledWidgetData, styledType } from '../style';

interface propsType extends styledType {
  onClick?: MouseEventHandler<HTMLDivElement>;
  children?: ReactNode;
}

export const SSAFYGITLAB = ({ onClick }: propsType) => {
  return (
    <>
      <StyledWidgetData onClick={onClick}>
        <div>* SSAFYGITLAB *</div>
      </StyledWidgetData>
    </>
  );
};
