// API & Library
import { ReactNode, MouseEventHandler } from 'react';

// Styles
import { StyledWidgetData, styledType } from '../style';

interface propsType extends styledType {
  onClick?: MouseEventHandler<HTMLDivElement>;
  children?: ReactNode;
}

export const JIRA = ({ onClick }: propsType) => {
  return (
    <>
      <StyledWidgetData onClick={onClick}>
        <div>* JIRA *</div>
      </StyledWidgetData>
    </>
  );
};
