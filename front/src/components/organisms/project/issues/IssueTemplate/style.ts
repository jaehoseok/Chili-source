import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledIssueBundle = styled.div`
  ${tw`flex`}
`;
export const StyledIssueTemplate = styled.div`
  ${tw`flex flex-col w-1/3 pl-4 items-center`}
`;

export const StyledIssueTemplateHeader = styled.div`
  ${tw`flex py-4 items-center`};
`;

export const StyledIssueTemplateBody = styled.div`
  ${tw`flex flex-col`}
`;

export const StyledIssueInfo = styled.div`
  ${tw`flex flex-col w-1/2 px-6`}
`;

export const StyledIssueInfoHeader = styled.div`
  ${tw`flex justify-end p-2`}
`;
export const StyledIssueInfoBody = styled.div`
  ${tw`p-4`}
`;
