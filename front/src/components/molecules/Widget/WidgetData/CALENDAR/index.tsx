// API & Library
import { ReactNode, MouseEventHandler } from 'react';

// Styles
import { styledType } from './style';

interface propsType extends styledType {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

export const CALENDAR = () => {
  return (
    <>
      <div>* CALENDAR *</div>
    </>
  );
};
