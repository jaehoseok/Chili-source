import {
  StyledIssueBar,
  StyledIssueBarType,
  StyledIssueBarContent,
  StyledIssueBarElement,
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
}

/**
 * @description
 * 미들 버킷에 추가된 IssueBar를 생성하는 컴포넌트
 * 이슈 유형(story, task, bug)에 따라 IssueBar를 생성할 수 있다.
 *
 * @example
 * <IssueBar summary={'이슈 제목'} epicLink={'에픽'} assignee={'담당자'} rank={'우선순위'} type={'story'} storyPoints={4}/>
 * <IssueBar summary={'이슈 제목'} epicLink={'에픽'} assignee={'담당자'} rank={'우선순위'} type={'task'} storyPoints={4}/>
 * <IssueBar summary={'이슈 제목'} epicLink={'에픽'} assignee={'담당자'} rank={'우선순위'} type={'bug'} storyPoints={4}/>
 *
 *
 * @param {string?} width           - 이슈 템플릿 넓이 [default: 400px]
 * @param {string?} height          - 이슈 템플릿 높이 [default: 90px]
 * @param {string} type             - 이슈 유형 ['story', 'task', 'bug']
 * @param {string?} project         - 프로젝트 이름
 * @param {string?} summary         - 이슈 제목
 * @param {string?} reporter        - 보고자
 * @param {string?} assignee        - 담당자
 * @param {string?} rank            - 우선순위
 * @param {string?} epicLink        - 에픽 링크
 * @param {string?} sprint          - 스프린트
 * @param {number?} storyPoints     - 스토리 포인트
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
}: propsType) => {
  const issueSummary = summary ? summary : '';
  const issueEpicLink = epicLink ? epicLink : '';
  const issueStoryPoints = storyPoints ? storyPoints : '';
  return (
    <>
      <StyledIssueBar width={width} height={height} type={type}>
        <StyledIssueBarType width={width} type={type}></StyledIssueBarType>
        <StyledIssueBarContent>
          <Text isFill={false} message={issueSummary}></Text>
          <StyledIssueBarElement>
            <Text width={24} isFill={issueEpicLink !== ''} message={issueEpicLink}></Text>
            <Circle height={24}>{assignee}</Circle>
            <Circle height={24}>{rank}</Circle>
            <Text width={24} isFill={true} message={issueStoryPoints + ''}></Text>
          </StyledIssueBarElement>
        </StyledIssueBarContent>
      </StyledIssueBar>
    </>
  );
};

export default index;
