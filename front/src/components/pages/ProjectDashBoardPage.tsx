// API & Library
import { auth } from 'api/rest';

import SelectBox from 'components/molecules/SelectBox';
import Option from 'components/atoms/Option';
import Sheet from 'components/atoms/Sheet';
import Button from 'components/atoms/Button';

const ProjectDashBoardPage = () => {
  // Methods
  const clickHandler = () => {
    console.log('버튼클릭');
  };

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
      <SelectBox labelName="이슈유형" selectWidth="30rem">
        <Option messages={['스토리', '태스크', '버그']}></Option>
      </SelectBox>
      {/* <div>ProjectDashBoardPage</div> */}
      <Button clickHandler={clickHandler} height={100} width={100} borderColor={'red'}>
        10
      </Button>
      <Sheet height="100px"></Sheet>
      {/* <StyledLandingPage>LandingPage</StyledLandingPage> */}
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

export default ProjectDashBoardPage;
