import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useGetIssuesNotDone } from 'hooks/issue';
import { useGetUserInfoHandler } from 'hooks/user';
import { useGetTeamForProject, useGetGanttChart } from 'hooks/project';

import {
  StyledJiraIssues,
  StyledPadding,
  StyledH4,
  StyledDescription,
  StyledMarginBottom,
  StyledFlexColCenter,
  StyledMarginTop,
} from './style';

import { FaLightbulb } from 'react-icons/fa';

import Issue from 'components/molecules/Issue';
import Sheet from 'components/atoms/Sheet';

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
          const storyPoint = eventEl.dataset.story_point;
          return {
            id,
            title,
            color,
            issueCode,
            issueSummary,
            projectId,
            userId,
            storyPoint,
          };
        },
      });
    }
  }, []);

  return (
    <StyledJiraIssues>
      <div id="external-events">
        {getIssuesNotDone.data &&
          getGanttChart.data &&
          filteringIssuesByDBGanttHandler().map(({ id, fields, key }, idx) => (
            <div
              className="fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2"
              title={fields.summary.summary}
              data-story_point={fields.customfield_10031}
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
                  fields.issuetype.id == '10001'
                    ? 'Story'
                    : fields.issuetype.id == '10002'
                    ? 'Task'
                    : 'Bug'
                }
                priority={fields.priority.name}
                assignee={fields.assignee.displayName}
                reporter={fields.assignee.displayName}
                storyPoints={fields.customfield_10031}
                epicLink={fields.parent ? fields.parent.fields.summary : '에픽 없음'}
              ></Issue>
            </div>
          ))}
      </div>
      <StyledMarginTop>
        <Sheet
          width="400px"
          height="180px"
          isShadow={true}
          backgroundColor={'#fcfcfc'}
          isHover={true}
        >
          <StyledPadding>
            <StyledFlexColCenter>
              <StyledH4 className="hover-text">
                캘린더
                <span className="hover-text">
                  <FaLightbulb style={{ position: 'relative', top: '2px', left: '8px' }} />
                </span>
              </StyledH4>
              <StyledMarginBottom />
              <StyledDescription className="hover-text">
                <li>오른쪽에 나타나는 이슈들을 원하는 날짜에 드래그 해보세요</li>
                <li>등록된 날짜의 이슈를 양 끝을 당겨 날짜를 조정해보세요</li>
                <li>등록된 날짜의 이슈를 클릭하시면, 이슈를 수정할 수 있어요</li>
                <li>DONE이 된 이슈는 더이상 나타나지 않습니다</li>
              </StyledDescription>
            </StyledFlexColCenter>
          </StyledPadding>
        </Sheet>
      </StyledMarginTop>
    </StyledJiraIssues>
  );
};

export default index;
