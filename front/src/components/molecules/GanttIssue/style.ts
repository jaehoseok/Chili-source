import styled from 'styled-components';
import tw from 'twin.macro';
export interface styledType {
  height?: string;
  width?: string;
  color?: string;
}

export const StyledGanttIssue = styled.div<styledType>`
  ${tw`flex flex-col items-center rounded-2xl overflow-hidden`};
  height: 200px;
  width: 400px;
`;

export const StyledGanttIssueLabel = styled.div<styledType>`
  ${tw`p-2 w-full`};
  background-color: red;
`;

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
  ${tw`flex flex-col justify-start`};
`;
export const StyledGanttIssueStartLabel = styled.div<styledType>`
  ${tw``};
`;
export const StyledGanttIssueProgress = styled.div<styledType>`
  ${tw`flex justify-between`};
`;
export const StyledGanttIssueEnd = styled.div<styledType>`
  ${tw`flex flex-col justify-end`};
`;
export const StyledGanttIssueEndLabel = styled.div<styledType>`
  ${tw``};
`;
