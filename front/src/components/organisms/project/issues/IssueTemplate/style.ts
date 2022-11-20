import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledIssueBundle = styled.div`
  ${tw`flex`}
`;
export const StyledIssueTemplate = styled.div`
  ${tw`flex flex-col pl-4`}
`;

export const StyledIssueTemplateHeader = styled.div`
  ${tw`flex py-4 items-center ml-10`};
`;

export const StyledIssueTemplateBody = styled.div`
  ${tw`flex flex-col`}
`;

export const StyledIssueInfo = styled.div`
  ${tw`flex flex-col px-6`}
`;

export const StyledIssueInfoHeader = styled.div`
  ${tw`flex justify-end p-2`}
`;
export const StyledIssueInfoBody = styled.div`
  ${tw`p-4`}
`;
export const StyledFlexCenter = styled.div`
  ${tw`w-full flex items-center mb-5`}
  max-width: 1200px;
`;
export const StyledH2 = styled.div`
  ${tw`font-bold text-2xl`}
`;
export const StyledHeight = styled.div`
  ${tw`h-full`}
`;
export const StyledLinkageToken = styled.div`
  p {
    margin-bottom: 2px;
    color: ${({ theme }) => theme.button.darkgray};
    font-size: 0.5rem;
  }
`;
export const StyledDescription = styled.div`
  ${tw`font-bold text-sm`}
`;
export const StyledBar = styled.div`
  ${tw`w-2 h-16 ml-7 mr-4`}
  background-color: ${({ theme }) => theme.color.primary};
`;

export const StyledText = styled.div`
  ${tw`flex items-center my-3 ml-5`}
`;
