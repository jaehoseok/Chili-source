import styled from 'styled-components';
import tw from 'twin.macro';
import { theme } from '../../../styles/theme';

export interface styledType {
  width?: number;
  height?: number;
  type: string;
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

export const StyledIssueBarContent = styled.div`
  ${tw`flex justify-between items-center rounded-r-md px-2.5 py-1.5`};
  width: 97%;
`;

export const StyledIssueBarElement = styled.div`
  ${tw`flex justify-around items-center`}
`;

StyledIssueBar.defaultProps = {
  width: 600,
  height: 40,
  type: '',
};
