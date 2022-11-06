import { useEffect, useState } from 'react';

import { MiddleBucket } from './style';
import Sheet from '../../atoms/Sheet';
import Button from '../../atoms/Button';
import IssueBar from '../../molecules/IssueBar';

const index = (props: any) => {
  const issue = {
    project: props.info.project,
    type: props.info.type,
    summary: props.info.summary,
    reporter: props.info.reporter,
    assignee: props.info.assignee,
    rank: props.info.rank,
    epicLink: props.info.epicLink,
    sprint: props.info.sprint,
    storyPoints: props.info.storyPoints,
  };
  const issue1 = {
    project: '프로젝트 명1',
    summary: '이슈 제목1',
    epicLink: '에픽1',
    reporter: '팀원1',
    assignee: '팀원1',
    rank: 'Low',
    type: 'story',
    sprint: '스프린트1',
    storyPoints: 8,
  };
  const issue2 = {
    project: '프로젝트 명2',
    summary: '이슈 제목2',
    epicLink: '에픽2',
    reporter: '팀원2',
    assignee: '팀원2',
    rank: 'Medium',
    type: 'task',
    sprint: '스프린트2',
    storyPoints: 4,
  };
  const issue3 = {
    project: '프로젝트 명3',
    summary: '이슈 제목3',
    epicLink: '에픽3',
    reporter: '팀원3',
    assignee: '팀원3',
    rank: 'High',
    type: 'bug',
    sprint: '스프린트3',
    storyPoints: 2,
  };
  const bucket = [issue1, issue2, issue3];
  useEffect(() => {
    bucket.push(issue);
  }, [issue]);
  const BarList = bucket.map(issue => (
    <IssueBar
      project={issue.project}
      summary={issue.summary}
      epicLink={issue.epicLink}
      reporter={issue.reporter}
      assignee={issue.assignee}
      rank={issue.rank}
      type={issue.type}
      sprint={issue.sprint}
      storyPoints={issue.storyPoints}
    />
  ));
  return (
    <MiddleBucket>
      <Sheet isShadow={false} flex={'column'}>
        {BarList}
      </Sheet>

      <Button
        borderColor={'red'}
        clickHandler={() => {
          console.log(props.info);
        }}
      >
        Bucket Test
      </Button>
    </MiddleBucket>
  );
};
export default index;
