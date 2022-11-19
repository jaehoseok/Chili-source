// COMPONENTS
import HeaderInitNav from 'components/organisms/common/HeaderInitNav';
import Main from 'components/organisms/setting/Main';

import { StyledContainer } from './style';

const index = () => {
  return (
    <StyledContainer>
      <HeaderInitNav></HeaderInitNav>
      <Main></Main>
    </StyledContainer>
  );
};

export default index;
