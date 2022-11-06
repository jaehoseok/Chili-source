import { MouseEventHandler, useState } from 'react';
import {
  StyledIssue,
  StyledIssueTop,
  StyledIssueBottom,
  StyledIssueBottomElement,
  styledType,
} from './style';
import Text from '../../atoms/Text';
import Circle from '../../atoms/Circle';

interface propsType extends styledType {
  project?: string;
  summary?: string;
  reporter?: string;
  assignee?: string;
  rank?: string;
  epicLink?: string;
  sprint?: string;
  storyPoints?: number;
  clickHandler?: any;
}

/**
 * @description
 * 이슈 템플릿의 Issue를 생성하는 컴포넌트
 * 이슈 유형(story, task, bug)에 따라 이슈 템플릿을 생성할 수 있다.
 *
 * @example
 * <Issue summary={'이슈 제목'} epicLink={'에픽'} assignee={'담당자'} rank={'우선순위'} type={'story'} storyPoints={4}/>
 * <Issue summary={'이슈 제목'} epicLink={'에픽'} assignee={'담당자'} rank={'우선순위'} type={'task'} storyPoints={4}/>
 * <Issue summary={'이슈 제목'} epicLink={'에픽'} assignee={'담당자'} rank={'우선순위'} type={'bug'} storyPoints={4}/>
 *
 * @param {string?} width                                       - 이슈 템플릿 넓이 [default: 400px]
 * @param {string?} height                                      - 이슈 템플릿 높이 [default: 90px]
 * @param {string} type                                         - 이슈 유형 ['story', 'task', 'bug']
 * @param {string?} project                                     - 프로젝트 이름
 * @param {string?} summary                                     - 이슈 제목
 * @param {string?} reporter                                    - 보고자
 * @param {string?} assignee                                    - 담당자
 * @param {string?} rank                                        - 우선순위
 * @param {string?} epicLink                                    - 에픽 링크
 * @param {string?} sprint                                      - 스프린트
 * @param {number?} storyPoints                                 - 스토리 포인트
 * @param {MouseEventHandler<HTMLDivElement>?} clickHandler     - 클릭 이벤트
 *
 * @author dbcs
 */

const index = ({
  width,
  height,
  project,
  type,
  summary,
  reporter,
  assignee,
  rank,
  epicLink,
  sprint,
  storyPoints,
  clickHandler,
}: propsType) => {
  let issueType: string;
  switch (type) {
    case 'story':
      issueType = '스토리';
      break;
    case 'task':
      issueType = '태스크';
      break;
    case 'bug':
      issueType = '버그';
      break;
    default:
      issueType = '에러';
      break;
  }
  const issueSummary = summary ? summary : '';
  const issueEpicLink = epicLink ? epicLink : '';
  const issueStoryPoints = storyPoints ? storyPoints : '';

  const issueData = {
    project: project,
    type: type,
    summary: summary,
    reporter: reporter,
    assignee: assignee,
    rank: rank,
    epicLink: epicLink,
    sprint: sprint,
    storyPoints: storyPoints,
  };
  return (
    <>
      <StyledIssue
        width={width}
        height={height}
        type={type}
        onClick={() => clickHandler(issueData)}
      >
        <StyledIssueTop type={type}>
          <Text isFill={false} message={issueType} color={'white'}></Text>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
          </svg>
        </StyledIssueTop>
        <StyledIssueBottom>
          <Text isFill={false} message={issueSummary}></Text>

          <StyledIssueBottomElement>
            <Text isFill={true} message={issueEpicLink} width={24}></Text>
            <Circle height={'24px'}>{assignee}</Circle>
            <Circle height={'24px'}>{rank}</Circle>
            <Text isFill={true} message={issueStoryPoints + ''} width={24}></Text>
          </StyledIssueBottomElement>
        </StyledIssueBottom>
      </StyledIssue>
    </>
  );
};

export default index;
