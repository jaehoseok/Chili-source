import { useState, useEffect } from 'react';
import { StyledIssueTemplate, StyledHeader, StyledBody } from './style';
import Issue from 'components/molecules/Issue';
import { issueType } from 'components/pages/IssuesPage';

const index = (props: any) => {
  const setInfoHandler = (issue: issueType) => {
    props.setInfo(issue);
  };

  const [issues, setIssues] = useState<issueType[]>([]);
  const IssueList = issues.map(issue => (
    <Issue
      project={issue.project}
      type={issue.type}
      summary={issue.summary}
      reporter={issue.reporter}
      assignee={issue.assignee}
      rank={issue.rank}
      epicLink={issue.epicLink}
      sprint={issue.sprint}
      storyPoints={issue.storyPoints}
      clickHandler={setInfoHandler}
    />
  ));
  const issue1: issueType = {
    project: '프로젝트1',
    type: 'story',
    summary: '이슈1',
    reporter: '팀원1',
    assignee: '팀원3',
    rank: 'Low',
    epicLink: '에픽1',
    sprint: '스프린트1',
    storyPoints: 8,
  };
  const issue2: issueType = {
    project: '프로젝트2',
    type: 'task',
    summary: '이슈2',
    reporter: '팀원2',
    assignee: '팀원2',
    rank: 'Medium',
    epicLink: '에픽2',
    sprint: '스프린트2',
    storyPoints: 4,
  };
  const issue3: issueType = {
    project: '프로젝트3',
    type: 'bug',
    summary: '이슈3',
    reporter: '팀원3',
    assignee: '팀원1',
    rank: 'Highest',
    epicLink: '에픽3',
    sprint: '스프린트3',
    storyPoints: 2,
  };
  useEffect(() => {
    setIssues([issue1, issue2, issue3]);
  }, []);

  return (
    <StyledIssueTemplate>
      <StyledHeader>header</StyledHeader>
      <StyledBody>{IssueList}</StyledBody>
    </StyledIssueTemplate>
  );
};

export default index;
