// API & Library
import { useState } from 'react';
import { useGetIssuesNotDone } from 'hooks/issue';
import { useGetUserInfoHandler } from 'hooks/user';
import { useGetTeamForProject, useGetGanttTasks, useGetGanttChart } from 'hooks/project';
import { FaLightbulb } from 'react-icons/fa';

// Styles
import {
  StyledGanttList,
  StyledMarginTop,
  StyledPadding,
  StyledFlexColCenter,
  StyledH4,
  StyledMarginBottom,
  StyledDescription,
} from './style';

// Components
import { useParams } from 'react-router-dom';
import { GanttListItem } from '../GanttListItem';
import Button from 'components/atoms/Button';
import Sheet from 'components/atoms/Sheet';
import Issue from 'components/molecules/Issue';

// Types
export interface ganttType {
  id?: number;
}

export const GanttList = () => {
  // Init
  const { projectId } = useParams();
  const [ganttList, setGanttList] = useState([{}, {}]);
  const getGanttTasks = useGetGanttTasks(1, Number(projectId)).data;

  const getIssuesNotDone = useGetIssuesNotDone(Number(projectId));
  const getUserInfo = useGetUserInfoHandler();
  const getTeamForProject = useGetTeamForProject(Number(projectId));
  const getGanttChart = useGetGanttChart(1, Number(projectId));

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

  // Methods
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

  return (
    <>
      <StyledGanttList className="gantt-aside">
        <StyledMarginTop>
          <Sheet
            width="280px"
            height="180px"
            isShadow={true}
            backgroundColor={'#fcfcfc'}
            isHover={true}
          >
            <StyledPadding>
              <StyledFlexColCenter>
                <StyledH4 className="hover-text">
                  간트 차트
                  <span className="hover-text">
                    <FaLightbulb style={{ position: 'relative', top: '2px', left: '8px' }} />
                  </span>
                </StyledH4>
                <StyledMarginBottom />
                <StyledDescription className="hover-text">
                  <li>오른쪽에 나타나는 이슈들을 오른쪽에 드래그 해보세요</li>
                  <li>등록된 날짜와 달성률을 조작하여 일정을 정리하세요</li>
                </StyledDescription>
              </StyledFlexColCenter>
            </StyledPadding>
          </Sheet>
        </StyledMarginTop>
        <div id="external-events">
          {getIssuesNotDone.data &&
            getGanttChart.data &&
            filteringIssuesByDBGanttHandler().map(({ id, fields, key }, idx) => (
              <div>
                <Issue
                  width="280px"
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
      </StyledGanttList>
    </>
  );
};
