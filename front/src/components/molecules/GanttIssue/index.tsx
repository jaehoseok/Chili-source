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
  StyledGanttIssueStartLabel,
  StyledGanttIssueProgress,
  StyledGanttIssueEnd,
  StyledGanttIssueEndLabel,
  styledType,
} from './style';

// Components
import Text from 'components/atoms/Text';
import Circle from 'components/atoms/Circle';

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
        <StyledGanttIssueLabel>
          <Circle height="30px"></Circle>
          <div>테스크 제목</div>
          <Circle height="30px"></Circle>
        </StyledGanttIssueLabel>
        <StyledGanttIssueDetail>설명</StyledGanttIssueDetail>
        <StyledGanttIssueLine></StyledGanttIssueLine>
        <StyledGanttIssueData>
          <StyledGanttIssueStart>
            <StyledGanttIssueEndLabel>
              <div>시작일</div>
            </StyledGanttIssueEndLabel>
            <div>0000/00/00 12:00</div>
          </StyledGanttIssueStart>
          <StyledGanttIssueProgress>
            <Text message="10%" isFill={true}></Text>
          </StyledGanttIssueProgress>
          <StyledGanttIssueEnd>
            <StyledGanttIssueEndLabel>
              <div>완료일</div>
            </StyledGanttIssueEndLabel>
            <div>0000/00/00 12:00</div>
          </StyledGanttIssueEnd>
        </StyledGanttIssueData>
      </StyledGanttIssue>
    </>
  );
};
