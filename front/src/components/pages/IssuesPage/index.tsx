import { useState } from 'react';
import { StyledIssuesPage, StyledHeader, StyledBody } from './style';
import IssueTemplate from 'components/organisms/project/issues/IssueTemplate';
import IssueInfo from 'components/organisms/project/issues/IssueInfo';
import MiddleBucket from 'components/organisms/project/issues/MiddleBucket';
import Issue from 'components/molecules/Issue';
import HeaderNav from 'components/organisms/common/HeaderServiceNav';

export type issueType = {
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
};
const index = () => {
  const issue: issueType = {
    templateId: 0,
    project: '',
    type: '',
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
  const [isInsert, setIsInsert] = useState(false);

  return (
    <StyledIssuesPage>
      <StyledHeader>
        <HeaderNav></HeaderNav>
      </StyledHeader>
      <StyledBody>
        <IssueTemplate setInfo={setInfo}></IssueTemplate>
        <IssueInfo info={info} setInfo={setInfo} setIsInsert={setIsInsert}></IssueInfo>
        <MiddleBucket info={info} isInsert={isInsert} setIsInsert={setIsInsert}></MiddleBucket>
      </StyledBody>
    </StyledIssuesPage>
  );
};

export default index;
