import styled from 'styled-components';
import tw from 'twin.macro';
import { theme } from '../../../styles/theme';

export interface styledType {
  width?: number;
  height?: number;
  project?: string;
  type: string;
  summary?: string;
  reporter?: string;
  assignee?: string;
  rank?: string;
  epicLink?: string;
  sprint?: string;
  storyPoints?: number;
}

export const StyledIssueBar = styled.div<styledType>`
  ${tw`flex rounded-md border border-solid border-gray-200`};

  ${({ width }) => `width: ${width}px`};
  ${({ height }) => `height: ${height}px`};
`;

export const StyledIssueBarType = styled.div<styledType>`
  ${tw`flex rounded-l-md`};
  width: 3%;
  ${({ type }) => `background-color: ${theme.issue[type]}`};
`;
export const StyledIssueBarContent = styled.div<styledType>`
  ${tw`flex justify-between rounded-r-md px-2.5 py-1.5`};
  width: 97%;
`;
export const StyledIssueBarLeft = styled.div<styledType>`
  ${tw`flex items-center`}
`;
export const StyledIssueBarRight = styled.div<styledType>`
  ${tw`flex justify-around items-center`}
`;
export const StyledIssueElement = styled.span<styledType>`
  ${tw`m-1 rounded-xl `};
  ${({ type }) =>
    type === 'epicLink' &&
    `background-color: #345678;
  padding: 0.25rem 0.625rem;`};
  ${({ type }) =>
    type === 'storyPoints' &&
    `background-color: #d9d9d9;
  padding: 0.25rem 0.625rem;`}
`;
StyledIssueBar.defaultProps = {
  width: 600,
  height: 40,
  project: '',
  type: '',
  summary: '',
  reporter: '',
  assignee: '',
  rank: '',
  epicLink: '',
  sprint: '',
  storyPoints: 0,
};
