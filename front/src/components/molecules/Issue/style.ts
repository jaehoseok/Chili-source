import styled, { css } from 'styled-components';
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

export const StyledIssue = styled.div<styledType>`
  ${tw`flex flex-col rounded-md shadow font-bold`};

  ${({ width }) => `width: ${width}px`};
  ${({ height }) => `height: ${height}px`};
`;

export const StyledIssueTop = styled.div<styledType>`
  ${tw`flex justify-between items-center text-white px-4 py-2 rounded-t-md`};
  ${({ type }) => `background-color: ${theme.issue[type]}`};
  height: 50%};
`;
export const StyledIssueBottom = styled.div<styledType>`
  ${tw`flex justify-between items-center px-4 py-2 rounded-b-md`};
  height: 50%;
`;

export const StyledIssueTopLeft = styled.div``;

export const StyledIssueBottomElement = styled.span<styledType>`
  ${tw`m-1 rounded-xl`};
  ${({ type }) =>
    type === 'epicLink' &&
    `background-color: #345678;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;`};
  ${({ type }) =>
    type === 'storyPoints' &&
    `background-color: #d9d9d9;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  margin-right: 0`}
`;

StyledIssue.defaultProps = {
  width: 400,
  height: 90,
  project: '',
  type: 'none',
  summary: '',
  reporter: '',
  assignee: '',
  rank: '',
  epicLink: '',
  sprint: '',
  storyPoints: 0,
};
