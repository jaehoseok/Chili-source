/**
 * props
 * project  프로젝트명
 * type (story, task, bug)  이슈 유형
 * summary  요약
 * description  설명
 * reporter 보고자
 * assignee 담당자
 * 우선순위
 * epic link
 * sprint
 * story points
 */
import { MouseEventHandler } from 'react';
import {
  StyledIssue,
  StyledIssueTop,
  StyledIssueBottom,
  StyledIssueBottomElement,
  StyledIssueTopLeft,
  styledType,
} from './style';

interface propsType extends styledType {
  clickHandler?: MouseEventHandler<HTMLDivElement>;
}

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
  return (
    <>
      <StyledIssue
        width={width}
        height={height}
        project={project}
        type={type}
        summary={summary}
        reporter={reporter}
        assignee={assignee}
        rank={rank}
        epicLink={epicLink}
        sprint={sprint}
        storyPoints={storyPoints}
        onClick={clickHandler}
      >
        <StyledIssueTop width={width} height={height} type={type}>
          <StyledIssueTopLeft></StyledIssueTopLeft>
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
        <StyledIssueBottom height={height} type={'none'}>
          <div>이슈제목</div>

          <div>
            <StyledIssueBottomElement type={'epicLink'}>{epicLink}</StyledIssueBottomElement>
            <StyledIssueBottomElement type={'assignee'}>{assignee}</StyledIssueBottomElement>
            <StyledIssueBottomElement type={'rank'}>{rank}</StyledIssueBottomElement>
            <StyledIssueBottomElement type={'storyPoints'}>{storyPoints}</StyledIssueBottomElement>
          </div>
        </StyledIssueBottom>
      </StyledIssue>
    </>
  );
};

export default index;
