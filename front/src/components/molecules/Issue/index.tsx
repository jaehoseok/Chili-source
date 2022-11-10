import { MouseEventHandler, useState } from 'react';
import {
  StyledIssue,
  StyledIssueTop,
  StyledIssueTopRight,
  StyledIssueBottom,
  StyledIssueBottomElement,
  styledType,
} from './style';
import Text from '../../atoms/Text';
import Circle from '../../atoms/Circle';
import { ImBin } from 'react-icons/im';
import { HiPencil } from 'react-icons/hi';

interface propsType extends styledType {
  templateId: number;
  project?: string;
  summary?: string;
  description?: string;
  reporter?: string;
  assignee?: string;
  rank?: string;
  epicLink?: string;
  sprint?: string;
  storyPoints?: number;
  clickHandler?: any;
  deleteHandler?: any;
  editEnableHandler?: any;
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
 * @param {number} templateId                                   - 이슈 템플릿 ID
 * @param {string?} project                                     - 프로젝트 이름
 * @param {string} type                                         - 이슈 유형 ['story', 'task', 'bug']
 * @param {string?} summary                                     - 이슈 제목
 * @param {string?} description                                 - 이슈 설명
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
  templateId,
  project,
  type,
  summary,
  description,
  reporter,
  assignee,
  rank,
  epicLink,
  sprint,
  storyPoints,
  clickHandler,
  deleteHandler,
  editEnableHandler,
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
    templateId: templateId,
    project: project,
    type: type,
    summary: summary,
    description: description,
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
          <StyledIssueTopRight>
            <ImBin onClick={() => deleteHandler(templateId)} />
            <HiPencil onClick={() => editEnableHandler()} />
          </StyledIssueTopRight>
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
