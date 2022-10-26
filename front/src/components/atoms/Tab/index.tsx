import React, { MouseEventHandler } from 'react';
import { StyledTab, StyledTypes } from './style';

interface propTypes extends StyledTypes {
  title: string;
  clickHandler?: MouseEventHandler<HTMLSpanElement>;
}

const index = ({ title, activated, clickHandler }: propTypes) => {
  return (
    <>
      <div>LandingPage</div>
      <StyledTab activated={activated} onClick={clickHandler}>
        {title}
      </StyledTab>
    </>
  );
};

export default index;
