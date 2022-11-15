import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { useGetIssuesNotDone } from 'hooks/issue';
import { useGetUserInfoHandler } from 'hooks/user';
import { useGetTeamForProject, useGetGanttChart } from 'hooks/project';

import { StyledJiraIssues } from './style';

import Issue from 'components/molecules/Issue';

import { Draggable } from '@fullcalendar/interaction';

/**
 * @description
 * 현재 자신에게 할당된 지라 이슈들을 가져온다.
 * 이후 Main에 있는 Calendar API에 매핑된다.
 *
 * @author bell
 */
const index = () => {
  const location = useLocation();
  const projectId = +location.pathname.split('/')[2];

  const getIssuesNotDone = useGetIssuesNotDone(projectId);
  const getUserInfo = useGetUserInfoHandler();
  const getTeamForProject = useGetTeamForProject(projectId);
  const getGanttChart = useGetGanttChart(1, projectId);

  const myInfo = () => {
    if (getTeamForProject.data && getUserInfo.data) {
      const idx = getTeamForProject.data.findIndex(item => item.userId === getUserInfo.data.id);
      if (idx > -1) {
        return getTeamForProject.data[idx];
      }
    }
  };

  const currentColor = myInfo()?.userColor;
  const currentImage = myInfo()?.userImage;

  // console.log(getIssuesNotDone.data);

  const filteringIssuesByDBGanttHandler = () => {
    const arr = [];
    if (getGanttChart.data && getIssuesNotDone.data) {
      for (const issues of getIssuesNotDone.data) {
        let check = true;
        for (const event of getGanttChart.data) {
          if (issues.key === event.issueCode) {
            check = false;
            break;
          }
        }
        if (check) {
          arr.push(issues);
        }
      }
    }
    return arr;
  };

  filteringIssuesByDBGanttHandler();

  useEffect(() => {
    const draggableEl = document.getElementById('external-events');
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          const id = eventEl.dataset.id;
          const title = eventEl.getAttribute('title');
          const color = eventEl.dataset.color;
          const issueCode = eventEl.dataset.issue_code;
          const issueSummary = eventEl.dataset.issue_summary;
          const projectId = eventEl.dataset.project_id;
          const userId = eventEl.dataset.user_id;
          return {
            id,
            title,
            color,
            issueCode,
            issueSummary,
            projectId,
            userId,
          };
        },
      });
    }
  }, []);

  return (
    <StyledJiraIssues>
      <div id="external-events" style={{ overflowY: 'scroll', maxHeight: '700px' }}>
        {getIssuesNotDone.data &&
          getGanttChart.data &&
          filteringIssuesByDBGanttHandler().map(({ id, fields, key }, idx) => (
            <div
              className="fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2"
              title={fields.summary.summary}
              data-id={id}
              data-color={currentColor}
              data-issue_code={key}
              data-issue_summary={fields.summary.summary}
              data-project_id={projectId}
              data-user_id={getUserInfo.data?.id}
              key={idx}
            >
              <Issue
                userImage={currentImage as string}
                issueTemplateId={+id}
                summary={fields.summary.summary}
                issueType={
                  fields.issuetype.name == '스토리'
                    ? 'story'
                    : fields.issuetype.name == '작업'
                    ? 'task'
                    : 'bug'
                }
                assignee={fields.assignee.displayName}
                reporter={fields.assignee.displayName}
                storyPoints={fields.customfield_10031}
                epicLink={fields.parent.fields.summary}
              ></Issue>
            </div>
          ))}
      </div>
    </StyledJiraIssues>
  );
};

export default index;
