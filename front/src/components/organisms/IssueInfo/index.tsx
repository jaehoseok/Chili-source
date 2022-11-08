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

  const projectRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const summaryRef = useRef<HTMLInputElement>(null);
  const reporterRef = useRef<HTMLSelectElement>(null);
  const assigneeRef = useRef<HTMLSelectElement>(null);
  const rankRef = useRef<HTMLSelectElement>(null);
  const epicLinkRef = useRef<HTMLSelectElement>(null);
  const sprintRef = useRef<HTMLSelectElement>(null);
  const storyPointsRef = useRef<HTMLInputElement>(null);

  return (
    <StyledIssueInfo>
      <Sheet isShadow={false} flex={'column'}>
        <InputBox
          isRow={false}
          labelName={'프로젝트'}
          inputValue={props.info.project}
          ref={projectRef}
        />
        <SelectBox labelName={'이슈 유형'} ref={typeRef}>
          <Option messages={['스토리', '태스크', '버그']} selected={issueType}></Option>
        </SelectBox>
        <InputBox
          isRow={false}
          labelName={'요약'}
          inputValue={props.info.summary}
          ref={summaryRef}
        />
        <TextAreaBox isRow={false} labelName={'설명'} textAreaValue={props.info.summary} />
        <SelectBox labelName={'보고자'} ref={reporterRef}>
          <Option messages={['팀원1', '팀원2', '팀원3']} selected={props.info.reporter}></Option>
        </SelectBox>
        <SelectBox labelName={'담당자'} ref={assigneeRef}>
          <Option messages={['팀원1', '팀원2', '팀원3']} selected={props.info.assignee}></Option>
        </SelectBox>
        <span style={{ color: '#4BADE8', cursor: 'pointer' }}>나에게 할당</span>
        <SelectBox labelName={'우선순위'} ref={rankRef}>
          <Option
            messages={['Highest', 'High', 'Medium', 'Low', 'Lowest']}
            selected={props.info.rank}
          ></Option>
        </SelectBox>
        <SelectBox labelName={'Epic Link'} ref={epicLinkRef}>
          <Option
            messages={['에픽1', '에픽2', '에픽3', '에픽4', '에픽5']}
            selected={props.info.epicLink}
          ></Option>
        </SelectBox>
        <SelectBox labelName={'Sprint'} ref={sprintRef}>
          <Option
            messages={['스프린트1', '스프린트2', '스프린트3', '스프린트4', '스프린트5']}
            selected={props.info.sprint}
          ></Option>
        </SelectBox>
        <InputBox
          isRow={false}
          labelName={'Story Points'}
          inputValue={props.info.storyPoints + ''}
          ref={storyPointsRef}
        />
      </Sheet>
      <Button borderColor="blue" clickHandler={() => console.log(props.info)}>
        IssueInfo Test
      </Button>
      <Button
        borderColor="green"
        clickHandler={() => {
          props.setInfo({
            project: projectRef.current ? projectRef.current.value : '',
            type: typeRef.current
              ? typeRef.current.value === '스토리'
                ? 'story'
                : typeRef.current.value === '태스크'
                ? 'task'
                : typeRef.current.value === '버그'
                ? 'bug'
                : 'error'
              : '',
            summary: summaryRef.current ? summaryRef.current.value : '',
            epicLink: epicLinkRef.current ? epicLinkRef.current.value : '',
            reporter: reporterRef.current ? reporterRef.current.value : '',
            assignee: assigneeRef.current ? assigneeRef.current.value : '',
            rank: rankRef.current ? rankRef.current.value : '',
            sprint: sprintRef.current ? sprintRef.current.value : '',
            storyPoints: storyPointsRef.current ? Number(storyPointsRef.current.value) : '',
          });
          props.setIsInsert(true);
        }}
      >
        IssueInfo Test
      </Button>
    </StyledIssueInfo>
  );
};

export default index;
