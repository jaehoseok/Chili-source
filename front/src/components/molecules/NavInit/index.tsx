import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { auth } from 'api/rest';

import { useGetTokens } from 'hooks/auth';
import { useGetUserInfoHandler } from 'hooks/user';

import { StyledContainer, StyledTap, StyledFlexWrapper, StyledText } from './style';

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
  const { data } = useGetUserInfoHandler();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  if (isLogin) {
    // react-query
    useGetUserInfoHandler();
    useGetTokens();
  }

  const clickLoginHandler = async () => {
    await auth.login('google');
  };

  const clickTestHandler = async () => {
    await auth.getTokens();
  };

  const clickLogoutHandler = async () => {
    await auth.logout();
    // 로그아웃 시 저장했던 쿼리데이터 삭제
    await queryClient.invalidateQueries(['userInfo']);
  };

  const clickToProjectSelectHandler = () => {
    navigate('/projects');
  };

  return (
    <>
      <StyledContainer>
        <StyledFlexWrapper>
          <StyledTap>
            <img
              src={logo}
              width={'32px'}
              style={{ transform: 'translateY(10%)' }}
              onClick={() => navigate('/')}
            ></img>
          </StyledTap>
          <StyledText>
            <Text
              isFill={false}
              message="+"
              fontSize="25px"
              color="#a9a9a9"
              fontWeight="100"
              clickHandler={clickToProjectSelectHandler}
            ></Text>
          </StyledText>
        </StyledFlexWrapper>
        {isLogin ? (
          <StyledFlexWrapper>
            <Circle url={data?.image} isImage={true} height={'40px'}></Circle>
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
