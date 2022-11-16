import { useState } from 'react';
import { StyledIssuesPage, StyledHeader, StyledBody } from './style';
import IssueTemplate from 'components/organisms/project/issues/IssueTemplate';
import MiddleBucket from 'components/organisms/project/issues/MiddleBucket';
import HeaderNav from 'components/organisms/common/HeaderServiceNav';

export interface issueType extends templateType {
  issueId: number;
}
export interface templateType {
  issueTemplateId: number;
  projectId: number;
  issueType: string;
  summary: string;
  description: string;
  assignee: string;
  priority: string;
  epicLink: string;
  sprint: number;
  storyPoints: number;
}
const index = () => {
  const dummyIssue: issueType = {
    issueTemplateId: 0,
    issueId: 0,
    projectId: 0,
    issueType: 'story',
    summary: '',
    description: '',
    assignee: '',
    priority: '',
    epicLink: '',
    sprint: 0,
    storyPoints: 0,
  };
  const [issue, setIssue] = useState<issueType>(dummyIssue);
  const [isInsert, setIsInsert] = useState(false);

  return (
    <StyledIssuesPage>
      <StyledHeader>
        <HeaderNav></HeaderNav>
      </StyledHeader>
      <StyledBody>
        <IssueTemplate issue={issue} setIssue={setIssue} setIsInsert={setIsInsert}></IssueTemplate>
        <MiddleBucket issue={issue} isInsert={isInsert} setIsInsert={setIsInsert}></MiddleBucket>
      </StyledBody>
    </StyledIssuesPage>
  );
};

export default index;
