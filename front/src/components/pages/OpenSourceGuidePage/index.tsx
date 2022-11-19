import React from 'react';

import { StyledContainer } from './style';

import HeaderInit from 'components/organisms/common/HeaderInitNav';
import SideBar from 'components/organisms/guide/SideBar';
import Main from 'components/organisms/guide/Main';

const index = () => {
  return (
    <>
      <HeaderInit />
      <StyledContainer>
        <SideBar />
        <Main />
      </StyledContainer>
    </>
  );
};

export default index;
