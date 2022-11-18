import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledJiraIssues = styled.div`
  ${tw`flex-initial max-w-3xl w-4/12 h-full flex justify-center items-center`}
  #external-events {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .fc-h-event {
    background-color: #ffffff;
    border: none;
  }
`;
