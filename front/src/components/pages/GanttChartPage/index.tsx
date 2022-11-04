// styles
import { StyledPage, StyledBody, StyledLetterBox } from './style';

// Components
import HeaderNav from 'components/organisms/common/HeaderServiceNav';
import { Aside, Section } from 'components/organisms/project/gantt-chart';

const GanttChartPage = () => {
  return (
    <>
      <StyledPage>
        <HeaderNav />
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
