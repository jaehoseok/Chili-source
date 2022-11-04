// API & Library
import { ReactNode } from 'react';

// Styles
import {
  StyledGanttIssue,
  StyledGanttIssueLabel,
  StyledGanttIssueDetail,
  StyledGanttIssueLine,
  StyledGanttIssueData,
  StyledGanttIssueStart,
  StyledGanttIssueProgress,
  StyledGanttIssueEnd,
  styledType,
} from './style';

// Components

interface propsType extends styledType {
  children?: ReactNode;
}

/**
 * @description
 * 만드는 중 입니다.
 *
 * @author inte
 */
export const GanttIssue = ({}: propsType) => {
  return (
    <>
      <StyledGanttIssue>
        <StyledGanttIssueLabel>이름</StyledGanttIssueLabel>
        <StyledGanttIssueDetail>테스크명</StyledGanttIssueDetail>
        <StyledGanttIssueLine></StyledGanttIssueLine>
        <StyledGanttIssueData>
          <StyledGanttIssueStart>
            <div>시작날짜</div>
            <div>시작날짜</div>
          </StyledGanttIssueStart>
          <StyledGanttIssueProgress>
            <div>달성률</div>
          </StyledGanttIssueProgress>
          <StyledGanttIssueEnd>
            <div>시작날짜</div>
            <div>시작날짜</div>
          </StyledGanttIssueEnd>
        </StyledGanttIssueData>
      </StyledGanttIssue>
    </>
  );
};
