import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledJiraIssues = styled.div`
  ${tw`flex-col max-w-3xl w-4/12 h-full flex justify-center items-center`}
  #external-events {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px 0;
    overflow-y: scroll;
    max-height: 400px;
  }
  .fc-h-event {
    background-color: #ffffff;
    border: none;
  }
`;

export const StyledMarginTop = styled.div`
  ${tw`mt-12`}
`;

export const StyledPadding = styled.div`
  ${tw`py-3 px-5`}
`;

export const StyledH4 = styled.div`
  ${tw`font-bold text-xl`}
`;

export const StyledDescription = styled.div`
  ${tw`font-bold text-sm`}
`;

export const StyledMarginBottom = styled.div`
  ${tw`mb-5`}
`;

export const StyledFlexColCenter = styled.div`
  ${tw`w-full h-full flex flex-col justify-center`}
`;
