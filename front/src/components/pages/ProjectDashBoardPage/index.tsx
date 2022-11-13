// API & Library
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { project, widget } from 'api/rest';

// Styles
import { StyledPage, StyledHeader, StyledBody, StyledSection } from './style';

// Components
import HeaderNav from 'components/organisms/common/HeaderServiceNav';
import { ProjectInfo, WidgetList } from 'components/organisms/project/dashboard';

const GanttChartPage = () => {
  return (
    <>
      <StyledPage>
        <StyledHeader>
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
