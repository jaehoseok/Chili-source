import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { theme } from '../../../styles/theme';
export interface styledType {
  width?: string;
  height?: string;
  isPinned?: boolean;
}

export interface styledInfoType {
  children?: React.ReactNode;
}
export const StyledProjectItem = styled.div<styledType>`
  ${tw`flex justify-center font-bold border border-solid border-2 rounded-2xl `};
  ${({ width }) => `width: ${width}`};
  ${({ height }) => `height: ${height}`};
  border-color: ${theme.button.gray};
`;

export const ProjectLogo = styled.div`
  ${tw`flex w-1/5 h-full justify-center items-center`};
`;

export const ProjectInfo = styled.div`
  ${tw`flex h-full py-1`}
  width: 65%;
`;

export const InfoCategory = styled.div`
  ${tw`flex flex-col justify-around items-start w-1/4 h-full`};
`;

export const InfoContent = styled.div<styledInfoType>`
  ${tw`flex flex-col justify-around items-start h-full`}
`;
export const ProjectOption = styled.div`
  ${tw`flex h-full justify-around ml-4 py-4`};
  width: 10%;
`;
StyledProjectItem.defaultProps = {
  width: '900px',
  height: '160px',
  isPinned: false,
};
