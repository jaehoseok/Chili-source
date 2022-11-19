import { useNavigate } from 'react-router-dom';

import { auth } from 'api/rest';

import { useGetTokens } from 'hooks/auth';
import { useGetUserInfoHandler } from 'hooks/user';

import { BiPowerOff } from 'react-icons/bi';

import {
  StyledContainer,
  StyledTap,
  StyledFlexMaxWidth,
  StyledFlexEvenly,
  StyledPosition,
  StyledPaddingL,
} from './style';
import { theme } from 'styles/theme';

import logo from 'assets/logo/logo.png';
import Text from 'components/atoms/Text';
import FillButton from 'components/atoms/FillButton';
import Circle from 'components/atoms/Circle';

/**
 * @description
 * 랜딩페이지, 유저 셋팅 페이지, 프로젝트 선택 페이지, 프로젝트 생성 페이지
 * 에서 쓰이는 네비게이션 컴포넌트
 *
 * @author bell
 */
const index = () => {
  const isLogin = localStorage.getItem('Authorization');

  // 쿼리 데이터 가져오기
  const getUserInfo = useGetUserInfoHandler();

  const navigate = useNavigate();

  if (isLogin) {
    // react-query
    useGetUserInfoHandler();
    useGetTokens();
  }

  const clickLoginHandler = async () => {
    await auth.login('google');
  };

  const clickLogoutHandler = async () => {
    await auth.logout();
  };

  return (
    <>
      <StyledContainer>
        <StyledFlexMaxWidth>
          <StyledTap>
            <img
              src={logo}
              width={'32px'}
              style={{ transform: 'translateY(7%)' }}
              onClick={() => navigate('/')}
            ></img>
          </StyledTap>
          <StyledFlexEvenly>
            <Text
              isFill={false}
              isHover={true}
              message="프로젝트 들어가기"
              fontSize="1rem"
              fontWeight="300"
              color="#a9a9a9"
              clickHandler={() => navigate('/projects')}
            ></Text>
            <Text
              isFill={false}
              isHover={true}
              message="프로젝트 생성"
              fontSize="1rem"
              fontWeight="300"
              color="#a9a9a9"
              clickHandler={() => navigate(`/new-project`)}
            ></Text>
            <Text
              isFill={false}
              isHover={true}
              message="가이드"
              fontSize="1rem"
              fontWeight="300"
              color="#a9a9a9"
              clickHandler={() => navigate('/guide/1')}
            ></Text>
            <Text
              isFill={false}
              isHover={true}
              message="유저 설정"
              fontSize="1rem"
              fontWeight="300"
              color="#a9a9a9"
              clickHandler={() => navigate(`/setting/${getUserInfo.data && getUserInfo.data.id}`)}
            ></Text>
          </StyledFlexEvenly>

          {isLogin && getUserInfo.data ? (
            <>
              <Circle
                url={getUserInfo.data.image}
                isImage={true}
                height={'40px'}
                clickHandler={() => navigate(`/setting/${getUserInfo.data.id}`)}
              ></Circle>
              <StyledPosition>
                <StyledPaddingL>
                  <FillButton
                    width="80px"
                    backgroundColor={theme.button.green}
                    height={'30px'}
                    isHover={true}
                    hoverColor={theme.button.red}
                    clickHandler={clickLogoutHandler}
                  >
                    로그아웃
                  </FillButton>
                </StyledPaddingL>
              </StyledPosition>
            </>
          ) : (
            <FillButton
              clickHandler={clickLoginHandler}
              isHover={true}
              hoverColor={theme.button.darkgreen}
              width={'80px'}
              height={'30px'}
            >
              로그인
            </FillButton>
          )}
        </StyledFlexMaxWidth>
      </StyledContainer>
    </>
  );
};

export default index;
