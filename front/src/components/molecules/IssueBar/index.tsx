import { useEffect, useState } from 'react';
import {
  StyledIssueBar,
  StyledIssueBarType,
  StyledIssueBarContent,
  StyledIssueBarElement,
  styledType,
} from './style';

import Text from '../../atoms/Text';
import Circle from '../../atoms/Circle';
import {
  FaAngleDoubleUp,
  FaAngleUp,
  FaMinus,
  FaAngleDown,
  FaAngleDoubleDown,
} from 'react-icons/fa';
import issueAxios from 'api/rest/issue';
interface propsType extends styledType {
  issueId?: number;
  summary?: string;
  description?: string;
  assignee?: string;
  priority?: string;
  epicLink?: string;
  sprint?: number;
  storyPoints?: number;
  userImage?: string;
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
 * @param {string?} width           - 이슈 바 넓이 [default: 400px]
 * @param {string?} height          - 이슈 바 높이 [default: 90px]
 * @param {string?} issueTemplateId - 이슈 템플릿 ID
 * @param {string?} issueId         - 이슈 ID
 * @param {string?} projectId       - 프로젝트 ID
 * @param {string} issueType        - 이슈 유형 ['story', 'task', 'bug']
 * @param {string?} summary         - 이슈 제목
 * @param {string?} description     - 이슈 설명
 * @param {string?} reporter        - 보고자
 * @param {string?} assignee        - 담당자
 * @param {string?} priority        - 우선순위
 * @param {string?} epicLink        - 에픽 링크
 * @param {string?} sprint          - 스프린트
 * @param {number?} storyPoints     - 스토리 포인트
 *
 * @author dbcs
 */

const index = ({
  width,
  height,
  issueId,
  issueType,
  summary,
  description,
  assignee,
  priority,
  epicLink,
  sprint,
  storyPoints,
  userImage,
}: propsType) => {
  const issueSummary = summary ? summary : '';
  const issueEpicLink = epicLink ? epicLink : '';
  const issueStoryPoints = storyPoints ? storyPoints : '';
  return (
    <>
      <StyledIssueBar width={width} height={height} issueType={issueType}>
        <StyledIssueBarType width={width} issueType={issueType}></StyledIssueBarType>
        <StyledIssueBarContent>
          <Text isFill={false} message={issueSummary}></Text>
          <StyledIssueBarElement>
            <Text width={24} isFill={issueEpicLink !== ''} message={issueEpicLink}></Text>
            <Circle height={'24px'}>
              {priority === 'Highest' && <FaAngleDoubleUp />}
              {priority === 'High' && <FaAngleUp />}
              {priority === 'Medium' && <FaMinus />}
              {priority === 'Low' && <FaAngleDown />}
              {priority == 'Lowest' && <FaAngleDoubleDown />}
            </Circle>
            <Circle height={'24px'} isImage={true} url={userImage}></Circle>
            <Text width={24} isFill={true} message={issueStoryPoints + ''}></Text>
          </StyledIssueBarElement>
        </StyledIssueBarContent>
      </StyledIssueBar>
    </>
  );
};

export default index;
