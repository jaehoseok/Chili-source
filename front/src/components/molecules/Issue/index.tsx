import { useEffect, useState } from 'react';
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
import {
  FaAngleDoubleUp,
  FaAngleUp,
  FaMinus,
  FaAngleDown,
  FaAngleDoubleDown,
} from 'react-icons/fa';
import issueAxios from 'api/rest/issue';
interface propsType extends styledType {
  issueTemplateId: number;
  projectId?: number;
  userImage?: string;
  summary?: string;
  description?: string;
  reporter?: string;
  assignee?: string;
  priority?: string;
  epicLink?: string;
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
 * @param {number} issueTemplateId                              - 이슈 템플릿 ID
 * @param {string?} projectId                                   - 프로젝트 ID
 * @param {string} issueType                                    - 이슈 유형 ['story', 'task', 'bug']
 * @param {string?} summary                                     - 이슈 제목
 * @param {string?} description                                 - 이슈 설명
 * @param {string?} reporter                                    - 보고자
 * @param {string?} assignee                                    - 담당자
 * @param {string?} priority                                    - 우선순위
 * @param {string?} epicLink                                    - 에픽 링크
 * @param {number?} storyPoints                                 - 스토리 포인트
 * @param {MouseEventHandler<HTMLDivElement>?} clickHandler     - 클릭 이벤트
 *
 * @author dbcs
 */

const index = ({
  width,
  height,
  issueTemplateId,
  projectId,
  issueType,
  summary,
  description,
  reporter,
  assignee,
  priority,
  epicLink,
  storyPoints,
  clickHandler,
  deleteHandler,
  editEnableHandler,
  userImage,
}: propsType) => {
  let iType: string;
  switch (issueType) {
    case 'Story':
      iType = '스토리';
      break;
    case 'Task':
      iType = '태스크';
      break;
    case 'Bug':
      iType = '버그';
      break;
    case '10001':
      iType = '스토리';
      break;
    case '10002':
      iType = '태스크';
      break;
    case '10004':
      iType = '버그';
      break;
    default:
      iType = '에러';
      break;
  }

  const issueSummary = summary ? summary : '';
  const issueEpicLink = epicLink ? epicLink : '';
  const issueStoryPoints = storyPoints ? storyPoints : '';

  const issueData = {
    issueTemplateId: issueTemplateId,
    projectId: projectId,
    issueType: issueType,
    summary: summary,
    description: description,
    reporter: reporter,
    assignee: assignee,
    priority: priority,
    epicLink: epicLink,
    storyPoints: storyPoints,
  };
  return (
    <>
      <StyledIssue
        width={width}
        height={height}
        issueType={issueType}
        onClick={() => {
          clickHandler(issueData);
          editEnableHandler(issueTemplateId);
        }}
      >
        <StyledIssueTop issueType={issueType}>
          <Text isFill={false} message={iType} color={'white'}></Text>
          <StyledIssueTopRight>
            <ImBin
              onClick={() => {
                issueData.projectId = 0;
                issueData.issueType = '';
                issueData.summary = '';
                issueData.description = '';
                issueData.reporter = '';
                issueData.assignee = '';
                issueData.priority = '';
                issueData.epicLink = '';
                issueData.storyPoints = 0;
                deleteHandler(issueTemplateId);
              }}
            />
          </StyledIssueTopRight>
        </StyledIssueTop>
        <StyledIssueBottom>
          <Text isFill={false} message={issueSummary}></Text>
          <StyledIssueBottomElement>
            <Text isFill={true} message={issueEpicLink} width={24}></Text>
            <Circle height={'24px'}>
              {priority === 'Highest' && <FaAngleDoubleUp />}
              {priority === 'High' && <FaAngleUp />}
              {priority === 'Medium' && <FaMinus />}
              {priority === 'Low' && <FaAngleDown />}
              {priority == 'Lowest' && <FaAngleDoubleDown />}
            </Circle>
            <Circle height={'24px'} isImage={true} url={userImage}></Circle>
            <Text isFill={true} message={issueStoryPoints + ''} width={24}></Text>
          </StyledIssueBottomElement>
        </StyledIssueBottom>
      </StyledIssue>
    </>
  );
};

export default index;
