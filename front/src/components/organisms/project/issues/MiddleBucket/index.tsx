import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { MiddleBucket, StyledBucketHeader, StyledBucketBody, StyledIssue } from './style';
import SelectBox from 'components/molecules/SelectBox';
import IssueBar from 'components/molecules/IssueBar';
import Circle from 'components/atoms/Circle';
import Sheet from 'components/atoms/Sheet';
import Button from 'components/atoms/Button';
import Option from 'components/atoms/Option';
import { issueType } from 'components/pages/IssuesPage';

import issueAxios from 'api/rest/issue';
const index = (props: any) => {
  const { projectId } = useParams();
  const pjtId = Number(projectId);
  const [issueId, setIssueId] = useState(0);
  const issue = {
    issueTemplateId: props.issue.issueTemplateId,
    issueId: issueId,
    projectId: props.issue.projectId,
    issueType: props.issue.issueType,
    summary: props.issue.summary,
    description: props.issue.description,
    reporter: props.issue.reporter,
    assignee: props.issue.assignee,
    priority: props.issue.priority,
    epicLink: props.issue.epicLink,
    sprint: props.issue.sprint,
    storyPoints: props.issue.storyPoints,
  };

  const [bucket, setBucket] = useState<issueType[]>([]);
  const sprintRef = useRef<HTMLSelectElement>(null);
  const getSprintList = issueAxios.getSprintList(pjtId);
  const [sprintList, setSprintList] = useState<string[]>();
  const sList: string[] = [];
  const pushSprintList = async () => {
    for (let i = 0; i < (await getSprintList).values.length; i++) {
      sList.push((await getSprintList).values[i].name);
    }
    setSprintList(sList);
  };
  useEffect(() => {
    pushSprintList();
  }, []);
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
        issueTemplateId={issue.issueTemplateId}
        issueId={issue.issueId}
        projectId={issue.projectId}
        issueType={issue.issueType}
        summary={issue.summary}
        description={issue.description}
        epicLink={issue.epicLink}
        reporter={issue.reporter}
        assignee={issue.assignee}
        priority={issue.priority}
        sprint={issue.sprint}
        storyPoints={issue.storyPoints}
      />
    </StyledIssue>
  ));
  return (
    <MiddleBucket>
      <StyledBucketHeader>
        <SelectBox labelName={'Sprint'} ref={sprintRef}>
          <Option messages={sprintList ? sprintList : ['']} selected={props.issue.sprint}></Option>
        </SelectBox>

        <Button
          borderColor={'#1973ee'}
          isHover
          clickHandler={() => {
            alert('미들버킷 이슈 지라로 전송');
            console.log(props.issue);
            console.log(bucket);
          }}
        >
          Send To Jira
        </Button>
      </StyledBucketHeader>
      <Sheet isShadow={false} flex={'column'} height={'90%'} isOverflowYScroll={true}>
        <StyledBucketBody>{BarList}</StyledBucketBody>
      </Sheet>
    </MiddleBucket>
  );
};
export default index;
