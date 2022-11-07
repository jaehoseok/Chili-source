import { useEffect, useRef, useState } from 'react';
import { StyledIssueInfo } from './style';
import Sheet from '../../atoms/Sheet';
import Button from '../../atoms/Button';
import InputBox from '../../molecules/InputBox';
import SelectBox from '../../molecules/SelectBox';
import TextAreaBox from '../../molecules/TextAreaBox';
import Option from '../../atoms/Option';

const index = (props: any) => {
  const issueType =
    props.info.type === 'story'
      ? '스토리'
      : props.info.type === 'task'
      ? '태스크'
      : props.info.type === 'bug'
      ? '버그'
      : '';
  // epicLink:epicLink,
  // reporter:reporter,
  // assignee:assignee,
  // rank:rank,
  // type:type,
  // sprint:sprint,
  const pjtRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const summaryRef = useRef<HTMLInputElement>(null);
  const reporterRef = useRef<HTMLSelectElement>(null);
  const assigneeRef = useRef<HTMLSelectElement>(null);
  const rankRef = useRef<HTMLSelectElement>(null);
  const epicLinkRef = useRef<HTMLSelectElement>(null);
  const sprintRef = useRef<HTMLSelectElement>(null);
  const pointRef = useRef<HTMLInputElement>(null);

  const [project, setProject] = useState(props.info.project);
  const [type, setType] = useState(props.info.type);
  const [summary, setSummary] = useState(props.info.summary);
  const [reporter, setReporter] = useState(props.info.reporter);
  const [assignee, setAssignee] = useState(props.info.assignee);
  const [rank, setRank] = useState(props.info.rank);
  const [epicLink, setEpicLink] = useState(props.info.epicLink);
  const [sprint, setSprint] = useState(props.info.sprint);
  const [storyPoints, setStoryPoints] = useState(props.info.storyPoints);

  return (
    <StyledIssueInfo>
      <Sheet isShadow={false} flex={'column'}>
        <InputBox
          isRow={false}
          labelName={'프로젝트'}
          inputValue={props.info.project}
          ref={pjtRef}
          setValue={setProject}
        />
        <SelectBox labelName={'이슈 유형'} ref={typeRef} setValue={setType}>
          <Option messages={['스토리', '태스크', '버그']} selected={issueType}></Option>
        </SelectBox>
        <InputBox
          isRow={false}
          labelName={'요약'}
          inputValue={props.info.summary}
          ref={summaryRef}
          setValue={setSummary}
        />
        <TextAreaBox
          isRow={false}
          labelName={'설명'}
          textAreaValue={props.info.summary}
          setValue={setSummary}
        />
        <SelectBox labelName={'보고자'}>
          <Option messages={['팀원1', '팀원2', '팀원3']} selected={props.info.reporter}></Option>
        </SelectBox>
        <SelectBox labelName={'담당자'}>
          <Option messages={['팀원1', '팀원2', '팀원3']} selected={props.info.assignee}></Option>
        </SelectBox>
        <span style={{ color: '#4BADE8', cursor: 'pointer' }}>나에게 할당</span>
        <SelectBox labelName={'우선순위'}>
          <Option
            messages={['Highest', 'High', 'Medium', 'Low', 'Lowest']}
            selected={props.info.rank}
          ></Option>
        </SelectBox>
        <SelectBox labelName={'Epic Link'}>
          <Option
            messages={['에픽1', '에픽2', '에픽3', '에픽4', '에픽5']}
            selected={props.info.epicLink}
          ></Option>
        </SelectBox>
        <SelectBox labelName={'Sprint'}>
          <Option
            messages={['스프린트1', '스프린트2', '스프린트3', '스프린트4', '스프린트5']}
            selected={props.info.sprint}
          ></Option>
        </SelectBox>
        <InputBox
          isRow={false}
          labelName={'Story Points'}
          inputValue={props.info.storyPoints + ''}
          ref={pointRef}
          setValue={setStoryPoints}
        />
      </Sheet>
      <Button borderColor="blue" clickHandler={() => console.log(props.info)}>
        IssueInfo Test
      </Button>
      <Button
        borderColor="green"
        clickHandler={() =>
          props.setInfo({
            project: project,
            summary: summary,
            // epicLink:epicLink,
            // reporter:reporter,
            // assignee:assignee,
            // rank:rank,
            // type:type,
            // sprint:sprint,
            storyPoints: storyPoints,
          })
        }
      >
        IssueInfo Test
      </Button>
    </StyledIssueInfo>
  );
};

export default index;
