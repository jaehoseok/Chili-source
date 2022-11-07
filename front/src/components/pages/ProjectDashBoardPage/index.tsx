// Styles
import { StyledPage, StyledHeaderGap, StyledBody, StyledSection } from './style';

// Components
import HeaderNav from 'components/organisms/common/HeaderServiceNav';
import { ProjectInfo, WidgetList } from 'components/organisms/project/dashboard';

const GanttChartPage = () => {
  return (
    <>
      <StyledPage>
        <StyledHeaderGap>
          <HeaderNav />
        </StyledHeaderGap>
        <StyledBody>
          <ProjectInfo />
          <StyledSection>
            <WidgetList />
          </StyledSection>
        </StyledBody>
      </StyledPage>
    </>
  );
};

export default GanttChartPage;
