import { StyledContainer } from './style';
import MainCalendar from 'components/organisms/projects/projectId/widget/calendar/Main';

const index = () => {
  return (
    <>
      <div>CalendarPage</div>
      <StyledContainer>
        <MainCalendar></MainCalendar>
      </StyledContainer>
    </>
  );
};

export default index;
