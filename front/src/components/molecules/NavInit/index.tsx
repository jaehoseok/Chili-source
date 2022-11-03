import { StyledContainer, StyledTap, StyledFlexWrapper, StyledText } from './style';

import logo from 'assets/logo/logo.png';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';

import { auth } from 'api/rest';

/**
 * @description
 * 랜딩페이지, 유저 셋팅 페이지, 프로젝트 선택 페이지, 프로젝트 생성 페이지
 * 에서 쓰이는 네비게이션 컴포넌트
 *
 * @param {ReactNode?} children       - 탭 컴포넌트
 *
 * @author bell
 */
const index = () => {
  const isLogin = localStorage.getItem('Authorization');

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
      <StyledContainer>
        <StyledFlexWrapper>
          <StyledTap>
            <img src={logo} width={'32px'} style={{ transform: 'translateY(10%)' }}></img>
          </StyledTap>
          <StyledText>
            <Text
              isFill={false}
              message="+"
              fontSize="25px"
              color="#a9a9a9"
              fontWeight="100"
            ></Text>
          </StyledText>
        </StyledFlexWrapper>
        {isLogin ? (
          <StyledFlexWrapper>
            <Button clickHandler={clickTestHandler} borderColor="red">
              테스트버튼
            </Button>
            <Button clickHandler={clickLogoutHandler} borderColor="red">
              로그아웃버튼
            </Button>
          </StyledFlexWrapper>
        ) : (
          <Button clickHandler={clickLoginHandler} borderColor="red">
            로그인버튼
          </Button>
        )}
      </StyledContainer>
    </>
  );
};

export default index;
