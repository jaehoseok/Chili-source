// import { useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { StyledCalendar } from './style';

const index = () => {
  // const [calendarEvents, setCalendarEvents] = useState([
  //   {
  //     id: 1,
  //     title: 'All-day event',
  //     color: '#388e3c',
  //     start: '2020-12-12',
  //     end: '2020-12-12',
  //     custom: 'questo è un campo custom',
  //   },
  //   {
  //     id: 2,
  //     title: 'Timed event',
  //     color: '#0097a7',
  //     start: '2020-12-07',
  //     end: '2020-12-10',
  //     custom: 'custom stuff',
  //   },
  // ]);

  // const handleEventReceive = (eventInfo: any) => {
  //   const newEvent = {
  //     id: eventInfo.draggedEl.getAttribute('data-id'),
  //     title: eventInfo.draggedEl.getAttribute('title'),
  //     color: eventInfo.draggedEl.getAttribute('data-color'),
  //     start: eventInfo.date,
  //     end: eventInfo.date,
  //     custom: eventInfo.draggedEl.getAttribute('data-custom'),
  //   };
  // };

  return (
    <StyledCalendar>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView={'dayGridMonth'}
        selectable={true}
        droppable={true}
        editable={true}
        // eventReceive={handleEventReceive}
      />
    </StyledCalendar>
  );
};

export default index;
