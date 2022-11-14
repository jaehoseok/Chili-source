import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  StyledIssueTemplate,
  StyledIssueTemplateHeader,
  StyledIssueTemplateBody,
  StyledIssueBundle,
  StyledIssueInfo,
  StyledIssueInfoHeader,
  StyledIssueInfoBody,
} from './style';
import { templateType } from 'components/pages/IssuesPage';
import Issue from 'components/molecules/Issue';
import Circle from 'components/atoms/Circle';
import Text from 'components/atoms/Text';
import Sheet from 'components/atoms/Sheet';
import Button from 'components/atoms/Button';
import InputBox from 'components/molecules/InputBox';
import SelectBox from 'components/molecules/SelectBox';
import TextAreaBox from 'components/molecules/TextAreaBox';
import Option from 'components/atoms/Option';
import { theme } from 'styles/theme';
import issueAxios from 'api/rest/issue';
import { useGetProject } from 'hooks/project';

const index = (props: any) => {
  const { projectId } = useParams();

  const getProject = useGetProject(Number(projectId));
  useEffect(() => {
    issueAxios.getIssueTemplateList(1);
    console.log(projectId);
    console.log(getProject.data ? getProject.data.name : '');
  }, []);
  const issue = {
    templateId: props.issue.templateId,
    projectId: props.issue.projectId,
    type: props.issue.type,
    summary: props.issue.summary,
    description: props.issue.description,
    reporter: props.issue.reporter,
    assignee: props.issue.assignee,
    rank: props.issue.rank,
    epicLink: props.issue.epicLink,
    sprint: props.issue.sprint,
    storyPoints: props.issue.storyPoints,
  };
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editNo, setEditNo] = useState(0);
  const [issues, setIssues] = useState<templateType[]>([]);
  const setInfoHandler = (issue: templateType) => {
    props.setIssue(issue);
  };
  const deleteHandler = (templateId: number) => {
    setIssues(issues.filter((issue: templateType) => issue.templateId !== templateId));
    issueAxios.deleteIssueTemplate(templateId);
  };
  const editEnableHandler = (templateId: number) => {
    setIsEdit(true);
    setIsAdd(false);
    setEditNo(templateId);
  };
  const addEnableHandler = () => {
    setIsAdd(true);
    setIsEdit(false);
  };

  const IssueList = issues.map((issue: templateType) => (
    <Issue
      templateId={issue.templateId}
      projectId={issue.projectId}
      type={issue.type}
      summary={issue.summary}
      description={issue.description}
      reporter={issue.reporter}
      assignee={issue.assignee}
      rank={issue.rank}
      epicLink={issue.epicLink}
      sprint={issue.sprint}
      storyPoints={issue.storyPoints}
      clickHandler={setInfoHandler}
      deleteHandler={deleteHandler}
      editEnableHandler={editEnableHandler}
    />
  ));

  const issue1: templateType = {
    templateId: 1,
    projectId: 1,
    type: 'story',
    summary: '이슈1',
    description: '설명1',
    reporter: '팀원1',
    assignee: '팀원3',
    rank: 'Low',
    epicLink: '에픽1',
    sprint: '스프린트1',
    storyPoints: 8,
  };
  const issue2: templateType = {
    templateId: 2,
    projectId: 1,
    type: 'task',
    summary: '이슈2',
    description: '설명2',
    reporter: '팀원2',
    assignee: '팀원2',
    rank: 'Medium',
    epicLink: '에픽2',
    sprint: '스프린트2',
    storyPoints: 4,
  };
  const issue3: templateType = {
    templateId: 3,
    projectId: 1,
    type: 'bug',
    summary: '이슈3',
    description: '설명3',
    reporter: '팀원3',
    assignee: '팀원1',
    rank: 'Highest',
    epicLink: '에픽3',
    sprint: '스프린트3',
    storyPoints: 2,
  };

  // IssueInfo 부분

  const iType =
    props.issue.type === 'story'
      ? '스토리'
      : props.issue.type === 'task'
      ? '태스크'
      : props.issue.type === 'bug'
      ? '버그'
      : '';

  const projectIdRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const summaryRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const reporterRef = useRef<HTMLSelectElement>(null);
  const assigneeRef = useRef<HTMLSelectElement>(null);
  const rankRef = useRef<HTMLSelectElement>(null);
  const epicLinkRef = useRef<HTMLSelectElement>(null);
  const sprintRef = useRef<HTMLSelectElement>(null);
  const storyPointsRef = useRef<HTMLInputElement>(null);

  const [templateId, setTemplateId] = useState<number>(0);
  const addTemplateHandler = () => {
    issue.templateId = templateId;
    issue.projectId = projectId;
    issue.type = typeRef.current
      ? typeRef.current.value === '스토리'
        ? 'story'
        : typeRef.current.value === '태스크'
        ? 'task'
        : typeRef.current.value === '버그'
        ? 'bug'
        : 'error'
      : '';
    issue.summary = summaryRef.current ? summaryRef.current.value : '';
    issue.description = descriptionRef.current ? descriptionRef.current.value : '';
    issue.epicLink = epicLinkRef.current ? epicLinkRef.current.value : '';
    issue.reporter = reporterRef.current ? reporterRef.current.value : '';
    issue.assignee = assigneeRef.current ? assigneeRef.current.value : '';
    issue.rank = rankRef.current ? rankRef.current.value : '';
    issue.sprint = sprintRef.current ? sprintRef.current.value : '';
    issue.storyPoints = storyPointsRef.current ? Number(storyPointsRef.current.value) : '';

    projectIdRef.current ? (projectIdRef.current.value = '') : '';
    // typeRef.current ? (typeRef.current.value = '') : '';
    summaryRef.current ? (summaryRef.current.value = '') : '';
    descriptionRef.current ? (descriptionRef.current.value = '') : '';
    // reporterRef.current ? (reporterRef.current.value = '') : '';
    // assigneeRef.current ? (assigneeRef.current.value = '') : '';
    // rankRef.current ? (rankRef.current.value = '') : '';
    // epicLinkRef.current ? (epicLinkRef.current.value = '') : '';
    // sprintRef.current ? (sprintRef.current.value = '') : '';
    storyPointsRef.current ? (storyPointsRef.current.value = '0') : '';
    console.log(issue);
    setTemplateId(templateId + 1);
    issues.push(issue);
    setIssues(issues);
    setIsAdd(false);
    issueAxios.postCreateIssueTemplate(
      issue.projectId,
      issue.type,
      issue.summary,
      issue.description,
      issue.assignee,
      issue.rank,
      issue.epicLink,
      issue.sprint,
      issue.storyPoints,
    );
  };

  const editTemplateHandler = () => {
    issues.forEach(issue => {
      if (issue.templateId === editNo) {
        projectIdRef.current ? (issue.projectId = Number(projectIdRef.current.value)) : ''; // projectId에 맞게 이름 매핑
        typeRef.current
          ? (issue.type =
              typeRef.current.value === '스토리'
                ? 'story'
                : typeRef.current.value === '태스크'
                ? 'task'
                : typeRef.current.value === '버그'
                ? 'bug'
                : 'error')
          : '';
        summaryRef.current ? (issue.summary = summaryRef.current.value) : '';
        descriptionRef.current ? (issue.description = descriptionRef.current.value) : '';
        reporterRef.current ? (issue.reporter = reporterRef.current.value) : '';
        assigneeRef.current ? (issue.assignee = assigneeRef.current.value) : '';
        rankRef.current ? (issue.rank = rankRef.current.value) : '';
        epicLinkRef.current ? (issue.epicLink = epicLinkRef.current.value) : '';
        sprintRef.current ? (issue.sprint = sprintRef.current.value) : '';
        storyPointsRef.current ? (issue.storyPoints = Number(storyPointsRef.current.value)) : '';
      }
    });
    setIsEdit(false);
  };

  const insertIssueHandler = () => {
    props.setIssue({
      templateId: props.issue.templateId,
      projectId: projectId,
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
      description: descriptionRef.current ? descriptionRef.current.value : '',
      epicLink: epicLinkRef.current ? epicLinkRef.current.value : '',
      reporter: reporterRef.current ? reporterRef.current.value : '',
      assignee: assigneeRef.current ? assigneeRef.current.value : '',
      rank: rankRef.current ? rankRef.current.value : '',
      sprint: sprintRef.current ? sprintRef.current.value : '',
      storyPoints: storyPointsRef.current ? Number(storyPointsRef.current.value) : '',
    });
    props.setIsInsert(true);
  };

  return (
    <StyledIssueBundle>
      <StyledIssueTemplate>
        <StyledIssueTemplateHeader>
          <Circle height={'5rem'} margin={'1rem'}>
            로고
          </Circle>
          <Text
            isFill={false}
            message={getProject.data ? getProject.data.name : ''}
            fontSize={'2.5rem'}
          />
        </StyledIssueTemplateHeader>
        <hr style={{ backgroundColor: 'gray', borderColor: 'lightgray', width: '400px' }} />

        <StyledIssueTemplateBody>
          <Text isFill={false} message={'이슈 템플릿'} fontSize={'1.5rem'} fontWeight={'bold'} />
          {IssueList}
          <Button
            width={'400px'}
            height={'90px'}
            borderColor={'#d9d9d9'}
            clickHandler={addEnableHandler}
          >
            +
          </Button>
        </StyledIssueTemplateBody>
      </StyledIssueTemplate>
      <StyledIssueInfo>
        <StyledIssueInfoHeader>
          <Button
            borderColor={theme.issue.bug}
            isDisabled={!isAdd}
            isHover
            clickHandler={addTemplateHandler}
          >
            Add Template
          </Button>
          <Button
            borderColor={theme.issue.story}
            isDisabled={!isEdit}
            isHover
            clickHandler={editTemplateHandler}
          >
            Edit Template
          </Button>
          <Button borderColor={theme.issue.task} isHover clickHandler={insertIssueHandler}>
            Insert to Bucket
          </Button>
        </StyledIssueInfoHeader>
        <Sheet isShadow={false} flex={'column'} height={'90%'} isOverflowYScroll={true}>
          <StyledIssueInfoBody>
            <InputBox
              isRow={false}
              labelName={'프로젝트'}
              inputValue={props.issue.project}
              ref={projectIdRef}
            />
            <SelectBox labelName={'이슈 유형'} ref={typeRef}>
              <Option messages={['스토리', '태스크', '버그']} selected={iType}></Option>
            </SelectBox>
            <InputBox
              isRow={false}
              labelName={'요약'}
              inputValue={props.issue.summary}
              ref={summaryRef}
            />
            <TextAreaBox
              isRow={false}
              labelName={'설명'}
              textAreaValue={props.issue.description}
              ref={descriptionRef}
            />
            <SelectBox labelName={'보고자'} ref={reporterRef}>
              <Option
                messages={['팀원1', '팀원2', '팀원3']}
                selected={props.issue.reporter}
              ></Option>
            </SelectBox>
            <SelectBox labelName={'담당자'} ref={assigneeRef}>
              <Option
                messages={['팀원1', '팀원2', '팀원3']}
                selected={props.issue.assignee}
              ></Option>
            </SelectBox>
            <span style={{ color: '#4BADE8', cursor: 'pointer' }}>나에게 할당</span>
            <SelectBox labelName={'우선순위'} ref={rankRef}>
              <Option
                messages={['Highest', 'High', 'Medium', 'Low', 'Lowest']}
                selected={props.issue.rank}
              ></Option>
            </SelectBox>
            <SelectBox labelName={'Epic Link'} ref={epicLinkRef}>
              <Option
                messages={['에픽1', '에픽2', '에픽3', '에픽4', '에픽5']}
                selected={props.issue.epicLink}
              ></Option>
            </SelectBox>
            <SelectBox labelName={'Sprint'} ref={sprintRef}>
              <Option
                messages={['스프린트1', '스프린트2', '스프린트3', '스프린트4', '스프린트5']}
                selected={props.issue.sprint}
              ></Option>
            </SelectBox>
            <InputBox
              isRow={false}
              labelName={'Story Points'}
              inputValue={props.issue.storyPoints + ''}
              ref={storyPointsRef}
            />
          </StyledIssueInfoBody>
        </Sheet>
      </StyledIssueInfo>
    </StyledIssueBundle>
  );
};

export default index;
