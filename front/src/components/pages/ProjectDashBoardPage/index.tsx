// Styles
import { StyledPage, StyledHeader, StyledBody, StyledSection } from './style';

// Components
import HeaderNav from 'components/organisms/common/HeaderServiceNav';
import { ProjectInfo, WidgetList } from 'components/organisms/project/dashboard';

const GanttChartPage = () => {
  return (
    <>
      <StyledPage className="page">
        <StyledHeader className="header">
          <HeaderNav />
        </StyledHeader>
        <StyledBody className="body">
          <ProjectInfo />
          <StyledSection className="section">
            <WidgetList />
          </StyledSection>
        </StyledBody>
      </StyledPage>
    </>
  );
};

export default GanttChartPage;
