// styles
import { StyledPage, StyledHeader, StyledBody, StyledLetterBox } from './style';

// Components
import HeaderNav from 'components/organisms/common/HeaderServiceNav';
import { Main } from 'components/organisms/project/gantt-chart';

const GanttChartPage = () => {
  return (
    <>
      <StyledPage className="page">
        <StyledHeader className="header">
          <HeaderNav />
        </StyledHeader>
        <StyledBody className="body">
          <StyledLetterBox className="letter-box" />
          <Main />
          <StyledLetterBox className="letter-box" />
        </StyledBody>
      </StyledPage>
    </>
  );
};

export default GanttChartPage;
