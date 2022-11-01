import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { theme } from '../../../styles/theme';
export interface styledType extends styledIssueType {
  width?: number;
  height?: number;
}

export interface styledIssueType {
  type: string;
}

export const StyledIssue = styled.div<styledType>`
  ${tw`flex flex-col rounded-2xl shadow font-bold`};

  ${({ width }) => `width: ${width}px`};
  ${({ height }) => `height: ${height}px`};
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
  width: 400,
  height: 90,
};
