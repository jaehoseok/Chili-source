import { useEffect, useState } from 'react';

import { MiddleBucket } from './style';
import Sheet from 'components/atoms/Sheet';
import Button from 'components/atoms/Button';
import IssueBar from 'components/molecules/IssueBar';

import { issueType } from 'components/pages/IssuesPage';

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

  const [bucket, setBucket] = useState<issueType[]>([]);

  useEffect(() => {
    if (props.isInsert) {
      bucket.push(issue);
      setBucket(bucket);
      props.setIsInsert(false);
    }
  }, [props.isInsert]);

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
      <Button
        borderColor={'red'}
        clickHandler={() => {
          console.log(props.info);
          console.log(bucket);
        }}
      >
        Bucket Test
      </Button>
      <Sheet isShadow={false} flex={'column'}>
        {BarList}
      </Sheet>
    </MiddleBucket>
  );
};
export default index;
