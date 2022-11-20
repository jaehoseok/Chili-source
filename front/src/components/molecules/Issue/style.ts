import styled from 'styled-components';
import tw from 'twin.macro';
import { theme } from '../../../styles/theme';
export interface styledType extends styledIssueType {
  width?: string;
  height?: string;
  marginX?: string;
  marginY?: string;
}

export interface styledIssueType {
  issueType: string;
}

export const StyledIssue = styled.div<styledType>`
  ${tw`flex flex-col rounded-2xl shadow font-bold`};

  ${({ width }) => `width: ${width}`};
  ${({ height }) => `height: ${height}`};
  ${({ marginX, marginY }) => `margin: ${marginY} ${marginX} ${marginY} ${marginX}`}
`;

export const StyledIssueTop = styled.div<styledIssueType>`
  ${tw`flex justify-between items-center text-white px-4 py-2 rounded-t-2xl`};
  ${({ issueType }) => `background-color: ${theme.issue[issueType.toLowerCase()]}`};
  height: 50%};
`;
export const StyledIssueBottom = styled.div`
  ${tw`flex justify-between items-center px-4 py-2 rounded-b-2xl`};
  height: 50%;
`;

export const StyledIssueTopRight = styled.div`
  ${tw`flex items-center px-2`}
`;

export const StyledIssueBottomElement = styled.div`
  ${tw`flex justify-end items-center`};
`;

StyledIssue.defaultProps = {
  width: '400px',
  height: '90px',
  marginX: '5px',
  marginY: '5px',
};
