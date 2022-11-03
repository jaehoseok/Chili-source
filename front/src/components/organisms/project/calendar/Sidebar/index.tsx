import { useEffect, useState, memo } from 'react';

import { StyledJiraIssues } from './style';
import { Draggable } from '@fullcalendar/interaction';

import Issue from 'components/molecules/Issue';

/**
 * @description
 * 현재 자신에게 할당된 지라 이슈들을 가져온다.
 * 이후 Main에 있는 Calendar API에 매핑된다.
 * 
 * @author bell
 */
const index = memo(() => {
  const [externalEvents, setExternalEvents] = useState([
    {
      title: '구글 로그인 구현',
      type: 'story',
      reporter: '박준혁',
      assignee: '박준혁',
      epicLink: '개발',
      storyPoints: 2,
      color: '#63BA3C',
      id: 34432,
    },
    {
      title: '티 타임',
      type: 'task',
      reporter: '박성현',
      assignee: '박성현',
      epicLink: '기타',
      storyPoints: 4,
      color: '#4BADE8',
      id: 323232,
    },
    {
      title: '네비게이션 바 제작',
      type: 'story',
      reporter: '석재호',
      assignee: '석재호',
      epicLink: '개발',
      storyPoints: 4,
      color: '#63BA3C',
      id: 1111,
    },
    {
      title: '미들 버킷',
      type: 'bug',
      reporter: '박태이',
      assignee: '박태이',
      epicLink: '개발',
      storyPoints: 2,
      color: '#E5493A',
      id: 432432,
    },
    {
      title: '간트 차트',
      type: 'story',
      reporter: '최진호',
      assignee: '최진호',
      epicLink: '개발',
      storyPoints: 1,
      color: '#63BA3C',
      id: 432123,
    },
  ]);

  useEffect(() => {
    const draggableEl = document.getElementById('external-events');
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          const id = eventEl.dataset.id;
          const title = eventEl.getAttribute('title');
          const color = eventEl.dataset.color;

          return {
            id: id,
            title: title,
            color: color,
            create: true,
          };
        },
      });
    }
  }, []);

  return (
    <StyledJiraIssues>
      <div id="external-events">
        {externalEvents.map(
          ({ title, id, color, type, storyPoints, reporter, assignee, epicLink }) => (
            <div
              className="fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2"
              title={title}
              data-id={id}
              data-color={color}
              key={id}
            >
              {/* <div className="fc-event-main">
              <div>
                <strong>{event.title}</strong>
              </div>
            </div> */}
              <Issue
                summary={title}
                type={type}
                assignee={assignee}
                reporter={reporter}
                storyPoints={storyPoints}
                epicLink={epicLink}
              ></Issue>
            </div>
          ),
        )}
      </div>
    </StyledJiraIssues>
  );
});

export default index;
