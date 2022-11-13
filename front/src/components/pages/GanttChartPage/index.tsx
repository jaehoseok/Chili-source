// styles
import { StyledPage, StyledHeader, StyledBody, StyledLetterBox } from './style';

// Components
import HeaderNav from 'components/organisms/common/HeaderServiceNav';
import { Main } from 'components/organisms/project/gantt-chart';

const GanttChartPage = () => {
  return (
    <>
      <StyledPage>
        <StyledHeader>
          <HeaderNav />
        </StyledHeader>
        <StyledBody>
          <Main />
        </StyledBody>
      </StyledPage>
    </>
  );
};

export default GanttChartPage;
