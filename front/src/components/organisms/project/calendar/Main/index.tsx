// import { useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { StyledCalendar } from './style';

/**
 * @description
 * Calendar API를 렌더링하는 컴포넌트
 * SideBar 지라 이슈들을 가져와 매핑하는 역할을 한다.
 *
 * @author bell
 */
const index = () => {
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
