import { ReactNode } from 'react';
import { StyledSheet, styledType } from './style';

interface propsType extends styledType {
  children?: ReactNode;
}

export const Sheet = (props: propsType) => {
  return (
    <>
      <StyledSheet
        width={props.width}
        height={props.height}
        backgroundColor={props.backgroundColor}
      >
        {props.children}
      </StyledSheet>
    </>
  );
};
