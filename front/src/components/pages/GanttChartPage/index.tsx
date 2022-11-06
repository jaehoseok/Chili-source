// styles
import { StyledPage, StyledHeader, StyledBody, StyledLetterBox } from './style';

// Components
import HeaderNav from 'components/organisms/common/HeaderServiceNav';
import { Aside, Section } from 'components/organisms/project/gantt-chart';

const GanttChartPage = () => {
  return (
    <>
      <StyledPage>
        <StyledHeader>
          <HeaderNav />
        </StyledHeader>
        <StyledBody>
          <StyledLetterBox />
          <Aside />
          <Section />
          <StyledLetterBox />
        </StyledBody>
      </StyledPage>
    </>
  );
};

export default GanttChartPage;
