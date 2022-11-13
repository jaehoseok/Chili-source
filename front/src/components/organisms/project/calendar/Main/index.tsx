// import { useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { StyledCalendar } from './style';
import { useGetGanttChart } from 'hooks/project';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface issueType {
  title: string;
  start: string;
  end: string;
  color: string;
}

/**
 * @description
 * Calendar API를 렌더링하는 컴포넌트
 * SideBar 지라 이슈들을 가져와 매핑하는 역할을 한다.
 *
 * @author bell
 */
const index = () => {
  const location = useLocation();

  const projectId = +location.pathname.split('/')[2];

  const getGanttChart = useGetGanttChart(1, projectId);

  const renderingDBIssuesForHandler = () => {
    const arr: issueType[] = [];
    if (getGanttChart.data) {
      for (const item of getGanttChart.data) {
        arr.push({
          title: item.issueSummary,
          start: item.startTime.split('T')[0],
          end: item.endTime.split('T')[0],
          color: '#212312',
        });
      }
      return arr;
    }
  };

  return (
    <StyledCalendar>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView={'dayGridMonth'}
        selectable={true}
        droppable={true}
        editable={true}
        events={renderingDBIssuesForHandler()}
        addEvent={() => {
          console.log();
        }}
        // eventReceive={handleEventReceive}
      />
    </StyledCalendar>
  );
};

export default index;
