// API & Library
import { ReactNode, MouseEventHandler } from 'react';

// Styles
import { StyledWidgetData, styledType } from '../style';

interface propsType extends styledType {
  url?: string | null;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const JIRA = ({ url, onClick }: propsType) => {
  return (
    <>
      <StyledWidgetData onClick={onClick}>
        <div>* JIRA *</div>
      </StyledWidgetData>
    </>
  );
};
