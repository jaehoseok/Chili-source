import { useNavigate } from 'react-router-dom';

import { auth } from 'api/rest';

import { useGetTokens } from 'hooks/auth';
import { useGetUserInfoHandler } from 'hooks/user';

import { StyledContainer, StyledTap, StyledFlexMaxWidth } from './style';

import logo from 'assets/logo/logo.png';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';
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

  const clickToProjectSelectHandler = () => {
    navigate('/projects');
  };

  return (
    <>
      <StyledContainer>
        <StyledFlexMaxWidth>
          <StyledTap>
            <img
              src={logo}
              width={'32px'}
              style={{ transform: 'translateY(10%)' }}
              onClick={() => navigate('/')}
            ></img>
          </StyledTap>

          <Text
            isFill={false}
            message="프로젝트"
            fontSize="1rem"
            fontWeight="300"
            color="#a9a9a9"
            clickHandler={clickToProjectSelectHandler}
          ></Text>

          {isLogin && getUserInfo.data ? (
            <Circle
              url={getUserInfo.data.image}
              isImage={true}
              height={'40px'}
              clickHandler={() => navigate(`/setting/${getUserInfo.data.id}`)}
            ></Circle>
          ) : (
            <Button clickHandler={clickLoginHandler} borderColor="red">
              로그인버튼
            </Button>
          )}
        </StyledFlexMaxWidth>
      </StyledContainer>
    </>
  );
};

export default index;
