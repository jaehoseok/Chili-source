import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledCalendar = styled.div`
  ${tw`flex-initial  w-6/12`}
  .fc-header-toolbar {
    color: green;
  }
  .fc-day-sun,
  .fc-day-sat {
    color: green;
  }
`;
