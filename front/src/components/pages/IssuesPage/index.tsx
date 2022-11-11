import { useState } from 'react';
import { StyledIssuesPage, StyledHeader, StyledBody } from './style';
import IssueTemplate from 'components/organisms/project/issues/IssueTemplate';
import IssueInfo from 'components/organisms/project/issues/IssueInfo';
import MiddleBucket from 'components/organisms/project/issues/MiddleBucket';
import Issue from 'components/molecules/Issue';
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
  const issue: issueType = {
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
  const [info, setInfo] = useState<issueType>(issue);
  const [issues, setIssues] = useState<templateType[]>([]);
  const [isInsert, setIsInsert] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <StyledIssuesPage>
      <StyledHeader>
        <HeaderNav></HeaderNav>
      </StyledHeader>
      <StyledBody>
        <IssueTemplate
          issues={issues}
          setIssues={setIssues}
          setInfo={setInfo}
          setIsAdd={setIsAdd}
          setIsEdit={setIsEdit}
        ></IssueTemplate>
        <IssueInfo
          info={info}
          issues={issues}
          isAdd={isAdd}
          isEdit={isEdit}
          setInfo={setInfo}
          setIssues={setIssues}
          setIsInsert={setIsInsert}
          setIsAdd={setIsAdd}
          setIsEdit={setIsEdit}
        ></IssueInfo>
        <MiddleBucket info={info} isInsert={isInsert} setIsInsert={setIsInsert}></MiddleBucket>
      </StyledBody>
    </StyledIssuesPage>
  );
};

export default index;
