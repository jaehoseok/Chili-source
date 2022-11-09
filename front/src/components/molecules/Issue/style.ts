import styled from 'styled-components';
import tw from 'twin.macro';
import { theme } from '../../../styles/theme';
export interface styledType extends styledIssueType {
  width?: string;
  height?: string;
}

export interface styledIssueType {
  type: string;
}

export const StyledIssue = styled.div<styledType>`
  ${tw`flex flex-col rounded-2xl shadow font-bold my-1`};

  ${({ width }) => `width: ${width}`};
  ${({ height }) => `height: ${height}`};
`;

export const StyledIssueTop = styled.div<styledIssueType>`
  ${tw`flex justify-between items-center text-white px-4 py-2 rounded-t-2xl`};
  ${({ type }) => `background-color: ${theme.issue[type]}`};
  height: 50%};
`;
export const StyledIssueBottom = styled.div`
  ${tw`flex justify-between items-center px-4 py-2 rounded-b-2xl`};
  height: 50%;
`;

export const StyledIssueTopLeft = styled.div``;

export const StyledIssueBottomElement = styled.div`
  ${tw`flex justify-end items-center`};
`;

StyledIssue.defaultProps = {
  width: '400px',
  height: '90px',
};
