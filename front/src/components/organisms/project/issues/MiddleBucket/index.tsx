import { useEffect, useState } from 'react';

import { MiddleBucket, StyledBucketHeader, StyledBucketBody, StyledIssue } from './style';
import Circle from 'components/atoms/Circle';
import Sheet from 'components/atoms/Sheet';
import Button from 'components/atoms/Button';
import IssueBar from 'components/molecules/IssueBar';

import { issueType } from 'components/pages/IssuesPage';

const index = (props: any) => {
  const [issueId, setIssueId] = useState(0);
  const issue = {
    templateId: props.info.templateId,
    issueId: issueId,
    project: props.info.project,
    type: props.info.type,
    summary: props.info.summary,
    description: props.info.description,
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
      setIssueId(issueId + 1);
      props.setIsInsert(false);
    }
  }, [props.isInsert]);

  const deleteHandler = (issueId: number) => {
    setBucket(bucket.filter(issue => issue.issueId !== issueId));
  };

  const BarList = bucket.map(issue => (
    <StyledIssue>
      <Circle
        height={'20px'}
        backgroundColor={'red'}
        margin={'10px'}
        fontColor={'white'}
        fontWeight={'bold'}
        isClickable
        clickHandler={() => deleteHandler(issue.issueId)}
      >
        -
      </Circle>
      <IssueBar
        templateId={issue.templateId}
        issueId={issue.issueId}
        project={issue.project}
        type={issue.type}
        summary={issue.summary}
        description={issue.description}
        epicLink={issue.epicLink}
        reporter={issue.reporter}
        assignee={issue.assignee}
        rank={issue.rank}
        sprint={issue.sprint}
        storyPoints={issue.storyPoints}
      />
    </StyledIssue>
  ));
  return (
    <MiddleBucket>
      <StyledBucketHeader>
        <Button
          borderColor={'red'}
          clickHandler={() => {
            console.log(props.info);
            console.log(bucket);
          }}
        >
          Bucket Test
        </Button>
      </StyledBucketHeader>
      <Sheet isShadow={false} flex={'column'} height={'90%'} isOverflowYScroll={true}>
        <StyledBucketBody>{BarList}</StyledBucketBody>
      </Sheet>
    </MiddleBucket>
  );
};
export default index;
