import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  children?: React.ReactNode;
  width?: number;
  height?: number;
  isPinned?: boolean;
  logoImg?: string; // 추후 교체예정
  title: string;
  leader: string;
  members: string[];
}

export const StyledProjectItem = styled.div<styledType>`
  ${tw`flex justify-center mb-3 px-2 py-2.5 border border-solid border-gray-200 rounded-2xl font-bold`};
  ${({ width }) => `width: ${width}px`};
  ${({ height }) => `height: ${height}px`};
`;

export const ProjectLogo = styled.div`
  ${tw`flex justify-center items-center`};
  width: 20%;
`;

export const ProjectInfo = styled.div`
  ${tw`flex flex-col justify-between py-1`}
  width: 70%;
`;
export const InfoElement = styled.div`
  ${tw`flex`}
  width: 100%;
`;
export const ElementCategory = styled.div`
  width: 25%;
`;
export const ElementContent = styled.div`
  ${tw`px-1`}
`;
export const ProjectOption = styled.div`
  ${tw`flex justify-around px-1`};
  width: 10%;
`;
StyledProjectItem.defaultProps = {
  width: 800,
  height: 140,
  isPinned: false,
};
