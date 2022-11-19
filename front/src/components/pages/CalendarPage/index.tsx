import { StyledContainer } from './style';
import MainCalendar from 'components/organisms/project/calendar/Main';
import SideBarJiraIssues from 'components/organisms/project/calendar/Sidebar';

import HeaderNav from 'components/organisms/common/HeaderServiceNav';

const index = () => {
  return (
    <>
      <StyledContainer>
        <HeaderNav></HeaderNav>
        <MainCalendar></MainCalendar>
        <SideBarJiraIssues></SideBarJiraIssues>
      </StyledContainer>
    </>
  );
};

export default index;
