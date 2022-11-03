// 테스트 링크 http://localhost:3000/project/1/gantt-chart

// styles
import { StyledGanttChartPage, StyledGanttChartBody } from './style';

// Components
import HeaderNav from 'HeaderNav';
import { Aside, Section } from 'components/organisms/project/gantt-chart';

const GanttChartPage = () => {
  return (
    <>
      <StyledGanttChartPage>
        <HeaderNav />
        <StyledGanttChartBody>
          <Aside />
          <Section />
        </StyledGanttChartBody>
      </StyledGanttChartPage>
    </>
  );
};

export default GanttChartPage;
