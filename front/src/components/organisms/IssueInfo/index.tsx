import { useEffect, useRef, MutableRefObject } from 'react';
import { StyledIssueInfo } from './style';
import Sheet from '../../atoms/Sheet';
import Button from '../../atoms/Button';
import InputBox from '../../molecules/InputBox';
import SelectBox from '../../molecules/SelectBox';
import TextAreaBox from '../../molecules/TextAreaBox';
import Option from '../../atoms/Option';

const index = (props: any) => {
  const type =
    props.info.type === 'story'
      ? '스토리'
      : props.info.type === 'task'
      ? '태스크'
      : props.info.type === 'bug'
      ? '버그'
      : '';
  const issue = props.info;
  const pjtRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLInputElement>(null);
  const pointRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log('asd');
  }, [pjtRef.current ? pjtRef.current.value : '']);

  return (
    <StyledIssueInfo>
      <Sheet isShadow={false} flex={'column'}>
        <InputBox
          isRow={false}
          labelName={'프로젝트'}
          inputValue={props.info.project}
          ref={pjtRef}
        />
        <SelectBox labelName={'이슈 유형'}>
          <Option messages={['스토리', '태스크', '버그']} selected={type}></Option>
        </SelectBox>
        <InputBox
          isRow={false}
          labelName={'요약'}
          inputValue={props.info.summary}
          ref={summaryRef}
        />
        <TextAreaBox isRow={false} labelName={'설명'} textAreaValue={props.info.summary} />
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
        />
      </Sheet>
      <Button borderColor="blue" clickHandler={() => console.log()}>
        IssueInfo Test
      </Button>
      <Button borderColor="green" clickHandler={() => props.setInfo(issue)}>
        IssueInfo Test
      </Button>
    </StyledIssueInfo>
  );
};

export default index;
