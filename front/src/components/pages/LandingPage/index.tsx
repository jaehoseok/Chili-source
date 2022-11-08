import { StyledPage, StyledHeader, StyledBody } from './style';

// Components
import HeaderInit from 'components/organisms/common/HeaderInitNav';

const LandingPage = () => {
  return (
    <>
      <StyledPage>
        <StyledHeader>
          <HeaderInit></HeaderInit>
        </StyledHeader>
        <StyledBody>
          <img src={require(`assets/images/LandingBanner.png`)} alt="" />
          <div>설명1</div>
          <div>설명2</div>
          <div>설명3</div>
        </StyledBody>
      </StyledPage>
    </>
  );
};

export default LandingPage;
