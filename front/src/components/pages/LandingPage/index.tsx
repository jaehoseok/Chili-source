// API & Library
import { useNavigate } from 'react-router-dom';

// Styles
import {
  StyledPage,
  StyledHeader,
  StyledBody,
  StyledSpacer,
  StyledButton,
  StyledSection,
  StyledContainer,
  StyledDrop,
} from './style';
import { theme } from 'styles/theme';

// Components
import HeaderInit from 'components/organisms/common/HeaderInitNav';

const LandingPage = () => {
  // Init
  const navigate = useNavigate();
  // Methods
  const clickHandler = () => {
    navigate(`/projects`);
  };

  return (
    <>
      <StyledPage className="page">
        <StyledHeader className="header">
          <HeaderInit></HeaderInit>
        </StyledHeader>
        <StyledBody className="body">
          <img src={require(`assets/images/LandingBanner.png`)} alt="" style={{ width: '100%' }} />
          <StyledSpacer />
          <StyledSpacer />
          <StyledSection className="section">
            <StyledSpacer />
            <StyledContainer
              className="container"
              backgroundImage={require('assets/images/landing0.jpg')}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src={require('assets/logo/logo512.png')} alt="logo" width={200} />
                <StyledSpacer />
                <h3>더 이상의 어려운 툴은 필요없다.</h3>
                <h1>
                  더욱 쉬워진 <span style={{ fontSize: '2.5rem', color: '#3ABB69' }}>"협업"</span>의
                  비법
                </h1>
                <StyledSpacer />
                <h3>지금, 칠리소스에서 여러분의 팀 프로젝트를 진행해보세요!</h3>
                <StyledSpacer />
                <StyledButton onClick={clickHandler} color1="#7579ff" color2="#b224ef">
                  시작하기
                </StyledButton>
              </div>
            </StyledContainer>
            <StyledSpacer />
          </StyledSection>
          <StyledSpacer />
          <StyledSpacer />
          <StyledSection className="section">
            <StyledSpacer />
            <StyledContainer className="container" backgroundColor="transparent">
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <StyledDrop backgroundRGBA="122,122,0,0.1">
                  <img
                    src={require('assets/images/landing1.png')}
                    width="120px"
                    height="120px"
                    alt=""
                  />
                  <h2>빠르게</h2>
                  <StyledSpacer value="1rem" />
                  <div>반복되는 이슈, 번거로운 관리</div>
                  <div>한번에 해결하세요!</div>
                </StyledDrop>
                <StyledDrop backgroundRGBA="122,122,0,0.1">
                  <img
                    src={require('assets/images/landing2.png')}
                    width="120px"
                    height="120px"
                    alt=""
                  />
                  <h2>편하게</h2>
                  <StyledSpacer value="1rem" />
                  <div>일정 및 프로젝트를</div>
                  <div>보다 편하게 한 눈에!</div>
                </StyledDrop>
                <StyledDrop backgroundRGBA="122,122,0,0.1">
                  <img
                    src={require('assets/images/landing3.png')}
                    width="120px"
                    height="120px"
                    alt=""
                  />
                  <h2>맛있게</h2>
                  <StyledSpacer value="1rem" />
                  <div>각종 기능들을</div>
                  <div>위젯으로 이용해보세요!</div>
                </StyledDrop>
              </div>
            </StyledContainer>
            <StyledSpacer />
          </StyledSection>

          <StyledSpacer />
          <StyledSpacer />

          <StyledSection>
            <StyledSpacer />
            <StyledContainer>
              <h3>지원 서비스</h3>
            </StyledContainer>
            <StyledSpacer />
          </StyledSection>
          <StyledSpacer />
          <StyledSpacer />

          <StyledSection>
            <StyledSpacer />
            <StyledContainer
              style={{
                height: '300px',
                backgroundColor: theme.color.primary,
                color: theme.button.white,
              }}
            >
              <h2>이슈</h2>
              <StyledSpacer />
              <h3 style={{ color: theme.button.white }}>클릭 한번으로 끝나는 이슈 생성</h3>
              <StyledSpacer />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <li>대량이 이슈를 한번에 등록해보세요</li>
                <li>자주 쓰이는 이슈를 저장하고 관리해보세요</li>
                <li>원하는 스프린트에 쉽고 빠르게!</li>
              </div>
            </StyledContainer>
            <StyledSpacer />
            <StyledContainer>
              <h2>캘린더</h2>
              <StyledSpacer />
              <h3 style={{ color: theme.color.primary }}>모든 팀원의 이슈를 한눈에 관리</h3>
              <StyledSpacer />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <li>이슈를 날짜별로 등록해보세요</li>
                <li>등록된 모든 이슈를 팀원과 공유해보세요</li>
                <li>일정에 따라 이슈를 자유롭게 변경해보세요</li>
              </div>
            </StyledContainer>
            <StyledSpacer />
            <StyledContainer>
              <h2>간트차트</h2>
              <StyledSpacer />
              <h3 style={{ color: theme.color.primary }}>팀원의 업무 진행상황을 확인</h3>
              <StyledSpacer />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <li>이슈의 진행도를 표시해보세요</li>
                <li>버전별로 차트를 관리하고 평가해보세요</li>
                <li>달력과 함께 동기화하여 사용해보세요</li>
              </div>
            </StyledContainer>
            <StyledSpacer />
          </StyledSection>
          <StyledSpacer />
        </StyledBody>
      </StyledPage>
    </>
  );
};

export default LandingPage;
