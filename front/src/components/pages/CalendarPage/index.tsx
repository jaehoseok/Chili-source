import { StyledContainer } from './style';
import MainCalendar from 'components/organisms/project/calendar/Main';
import SideBarJiraIssues from 'components/organisms/project/calendar/Sidebar';

const index = () => {
  return (
    <StyledContainer>
      <MainCalendar></MainCalendar>
      <SideBarJiraIssues></SideBarJiraIssues>
    </StyledContainer>
  );
};

export default index;
