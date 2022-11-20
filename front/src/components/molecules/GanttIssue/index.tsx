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
  color?: string;
  img?: string;
  name?: string;
  children?: ReactNode;
  issueSummary?: string;
  startTime?: Date;
  endTime?: Date;
  progress?: number;
  version?: number;
}

/**
 * @description
 * 만드는 중 입니다.
 *
 * @author inte
 */
export const GanttIssue = ({
  color,
  img,
  name,
  version,
  startTime,
  endTime,
  progress,
  issueSummary,
}: propsType) => {
  return (
    <>
      <StyledGanttIssue>
        <StyledGanttIssueLabel color={color}>
          <Circle height="30px">
            <img src={img} alt="사진" />
          </Circle>
          <div style={{ flexGrow: 1, paddingLeft: '8px' }}>{name}</div>
          <Circle height="30px">{version}</Circle>
        </StyledGanttIssueLabel>
        <StyledGanttIssueDetail>{issueSummary}</StyledGanttIssueDetail>
        <StyledGanttIssueLine></StyledGanttIssueLine>
        <StyledGanttIssueData>
          <StyledGanttIssueStart>
            <StyledGanttIssueEndLabel>
              <div>시작일</div>
            </StyledGanttIssueEndLabel>
            <div>{startTime?.toISOString().replace('T', ' ').replace(/\..*/, '')}</div>
          </StyledGanttIssueStart>
          <StyledGanttIssueProgress>
            <Text message={`${progress}%`} isFill={true}></Text>
          </StyledGanttIssueProgress>
          <StyledGanttIssueEnd>
            <StyledGanttIssueEndLabel>
              <div>완료일</div>
            </StyledGanttIssueEndLabel>
            <div>{endTime?.toISOString().replace('T', ' ').replace(/\..*/, '')}</div>
          </StyledGanttIssueEnd>
        </StyledGanttIssueData>
      </StyledGanttIssue>
    </>
  );
};
