// API & Library
import { auth } from 'api/rest';

// Styles
import { StyledLandingPage } from './style';

// Components
import Button from 'components/atoms/Button';

const LandingPage = () => {
  // Methods
  const clickLoginHandler = () => {
    auth.login('google');
  };

  const clickTestHandler = async () => {
    await auth.getTokens();
  };

  const clickLogoutHandler = async () => {
    await auth.logout();
  };

  return (
    <>
      <StyledLandingPage>LandingPage</StyledLandingPage>
      <Button clickHandler={clickLoginHandler} borderColor="red">
        로그인버튼
      </Button>

      <Button clickHandler={clickTestHandler} borderColor="red">
        테스트버튼
      </Button>

      <Button clickHandler={clickLogoutHandler} borderColor="red">
        로그아웃버튼
      </Button>
    </>
  );
};

export default LandingPage;
