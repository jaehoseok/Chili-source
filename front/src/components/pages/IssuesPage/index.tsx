import { useState } from 'react';
import { StyledIssuesPage, StyledHeader, StyledBody } from './style';
import IssueTemplate from 'components/organisms/project/issues/IssueTemplate';
import MiddleBucket from 'components/organisms/project/issues/MiddleBucket';
import HeaderNav from 'components/organisms/common/HeaderServiceNav';

export interface issueType extends templateType {
  issueId: number;
}
export interface templateType {
  templateId: number;
  project: string;
  type: string;
  summary: string;
  description: string;
  reporter: string;
  assignee: string;
  rank: string;
  epicLink: string;
  sprint: string;
  storyPoints: number;
}
const index = () => {
  const dummyIssue: issueType = {
    templateId: 0,
    issueId: 0,
    project: '',
    type: 'story',
    summary: '',
    description: '',
    reporter: '',
    assignee: '',
    rank: '',
    epicLink: '',
    sprint: '',
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
        <IssueTemplate
          issue={issue}
          // issues={issues}
          // setIssues={setIssues}
          setIssue={setIssue}
          setIsInsert={setIsInsert}
        ></IssueTemplate>
        {/* <IssueInfo
          info={info}
          issues={issues}
          isAdd={isAdd}
          isEdit={isEdit}
          setInfo={setInfo}
          setIssues={setIssues}
          setIsInsert={setIsInsert}
          setIsAdd={setIsAdd}
          setIsEdit={setIsEdit}
        ></IssueInfo> */}
        <MiddleBucket issue={issue} isInsert={isInsert} setIsInsert={setIsInsert}></MiddleBucket>
      </StyledBody>
    </StyledIssuesPage>
  );
};

export default index;
