// Styles
import { StyledPage, StyledHeader, StyledBody } from './style';

// Components
import HeaderInitNav from 'components/organisms/common/HeaderInitNav';

const ErrorPage = () => {
  return (
    <StyledPage className="page">
      <StyledHeader className="header">
        <HeaderInitNav />
      </StyledHeader>
      <StyledBody className="body">
        <img src={require('assets/images/error.png')} alt="page not found" width={400} />
        <h1>앗, 에러 페이지군요.</h1>
        <h4>오픈소스 프로젝트 잖아요. 이런 날도 있는거죠, 뭐</h4>
      </StyledBody>
    </StyledPage>
  );
};

export default ErrorPage;
