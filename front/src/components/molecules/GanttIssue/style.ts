import styled from 'styled-components';
import tw from 'twin.macro';
export interface styledType {
  height?: string;
  width?: string;
  color?: string;
}

export const StyledGanttIssue = styled.div<styledType>`
  ${tw`flex flex-col items-center rounded-2xl overflow-hidden`};
  background-color: white;
  height: 140px;
  min-height: 140px;
  width: 400px;
  opacity: 1;
  box-shadow: 4px 4px 10px -1px rgba(0, 0, 0, 0.25), -4px -4px 10px -1px rgba(255, 255, 255, 0.25);
`;

export const StyledGanttIssueLabel = styled.div<styledType>`
  ${tw`p-2 flex justify-between items-center w-full`};
  background-color: ${({ color }) => color};
`;
StyledGanttIssueLabel.defaultProps = {
  color: 'gray',
};

export const StyledGanttIssueDetail = styled.div<styledType>`
  ${tw`p-2 flex-grow-[1] w-full bg-gray-200`};
`;

export const StyledGanttIssueLine = styled.div<styledType>`
  height: 2px;
  width: 90%;
  margin: 4px;
  background: gray;
  border-radius: 2px;
`;

export const StyledGanttIssueData = styled.div<styledType>`
  ${tw`p-2 flex w-full justify-between`};
`;

export const StyledGanttIssueStart = styled.div<styledType>`
  ${tw`flex flex-col items-start`};
  font-size: 0.8rem;
`;
export const StyledGanttIssueStartLabel = styled.div<styledType>`
  ${tw``};
`;
export const StyledGanttIssueProgress = styled.div<styledType>`
  ${tw`flex flex-col justify-center`};
`;
export const StyledGanttIssueEnd = styled.div<styledType>`
  ${tw`flex flex-col items-end`};
  font-size: 0.8rem;
`;
export const StyledGanttIssueEndLabel = styled.div<styledType>`
  ${tw``};
  color: gray;
  font-size: 0.5rem;
`;
