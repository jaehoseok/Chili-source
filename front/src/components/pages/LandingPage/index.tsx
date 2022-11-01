// API & Library
import { auth } from 'api/rest';

// Styles
import { StyledLandingPage } from './style';

// Components
import Button from 'components/atoms/Button';

const LandingPage = () => {
  const clickHandler = async () => {
    console.log('눌렸당');
    await auth.login('google');
  };

  return (
    <>
      <StyledLandingPage>LandingPage</StyledLandingPage>
      <Button clickHandler={clickHandler} borderColor="red">
        로그인버튼
      </Button>
    </>
  );
};

export default LandingPage;
