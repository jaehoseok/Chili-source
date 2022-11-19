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
import { HiPlus } from 'react-icons/hi';
import issueAxios from 'api/rest/issue';
import projectAxios from 'api/rest/project';
import { useGetProject } from 'hooks/project';
import { useGetUserInfoHandler } from 'hooks/user';
const index = (props: any) => {
  const { projectId } = useParams();
  const pjtId = Number(projectId);
  const getProject = useGetProject(pjtId);
  const getUser = useGetUserInfoHandler();
  const getEpicList = issueAxios.getEpicList();
  const [epicList, setEpicList] = useState<string[]>();
  const [keyList, setKeyList] = useState<string[]>();
  const eList: string[] = [];
  const kList: string[] = [];
  const pushEpicList = async () => {
    for (let i = 0; i < (await getEpicList).issues.length; i++) {
      eList.push((await getEpicList).issues[i].fields.summary);
      kList.push((await getEpicList).issues[i].key);
    }
    console.log(await getEpicList);
    setEpicList(eList);
    setKeyList(kList);
  };
  const getTeamMemberList = projectAxios.getTeamForProject(pjtId);
  const [memberList, setMemberList] = useState<string[]>();
  const mList: string[] = [];

  const pushTeamMemberList = async () => {
    for (let i = 0; i < (await getTeamMemberList).length; i++) {
      mList.push((await getTeamMemberList)[i].userName);
    }
    setMemberList(mList);
  };

  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editNo, setEditNo] = useState(0);
  const [issues, setIssues] = useState<templateType[]>([]);

  const getIssueTemplateList = issueAxios.getIssueTemplateList(pjtId);
  const iList: templateType[] = [];
  const pushIssueTemplateList = async () => {
    for (let i = 0; i < (await getIssueTemplateList).length; i++) {
      iList.push((await getIssueTemplateList)[i]);
    }
    setIssues(iList);
  };

  useEffect(() => {
    pushEpicList();
    console.log(eList);
    pushIssueTemplateList();
    pushTeamMemberList();
  }, []);

  const issue = {
    issueTemplateId: props.issue.issueTemplateId,
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

  const setInfoHandler = (issue: templateType) => {
    console.log(issue);
    props.setIssue(issue);
  };
  const deleteHandler = (issueTemplateId: number) => {
    issueAxios.deleteIssueTemplate(issueTemplateId);
    setIssues(issues.filter((issue: templateType) => issue.issueTemplateId !== issueTemplateId));
  };
  const editEnableHandler = (issueTemplateId: number) => {
    setIsEdit(true);
    setIsAdd(false);
    setEditNo(issueTemplateId);
  };
  const addEnableHandler = () => {
    setIsAdd(true);
    setIsEdit(false);
  };

  const IssueList = issues.map((issue: templateType) => (
    <Issue
      issueTemplateId={issue.issueTemplateId}
      projectId={pjtId}
      issueType={issue.issueType}
      summary={issue.summary}
      description={issue.description}
      reporter={getUser.data ? getUser.data.name : ''}
      assignee={issue.assignee}
      priority={issue.priority}
      epicLink={issue.epicLink}
      storyPoints={issue.storyPoints}
      clickHandler={setInfoHandler}
      deleteHandler={deleteHandler}
      editEnableHandler={editEnableHandler}
    />
  ));

  // IssueInfo 부분

  const iType =
    props.issue.issueType === 'Story'
      ? '스토리'
      : props.issue.issueType === 'Task'
      ? '태스크'
      : props.issue.issueType === 'Bug'
      ? '버그'
      : '';

  const projectRef = useRef<HTMLInputElement>(null);
  const issueTypeRef = useRef<HTMLSelectElement>(null);
  const summaryRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const assigneeRef = useRef<HTMLSelectElement>(null);
  const priorityRef = useRef<HTMLSelectElement>(null);
  const epicLinkRef = useRef<HTMLSelectElement>(null);
  const storyPointsRef = useRef<HTMLInputElement>(null);

  const [templateId, setTemplateId] = useState<number>(0);
  const addTemplateHandler = () => {
    issue.issueTemplateId = templateId;
    issue.projectId = projectId;
    issue.issueType = issueTypeRef.current
      ? issueTypeRef.current.value === '스토리'
        ? 'Story'
        : issueTypeRef.current.value === '태스크'
        ? 'Task'
        : issueTypeRef.current.value === '버그'
        ? 'Bug'
        : 'Error'
      : '';
    issue.summary = summaryRef.current ? summaryRef.current.value : '';
    issue.description = descriptionRef.current ? descriptionRef.current.value : '';
    issue.epicLink = epicLinkRef.current ? epicLinkRef.current.value : '';
    issue.assignee = assigneeRef.current ? assigneeRef.current.value : '';
    issue.priority = priorityRef.current ? priorityRef.current.value : '';
    issue.storyPoints = storyPointsRef.current ? Number(storyPointsRef.current.value) : '';

    // projectRef.current ? (projectRef.current.value = '') : '';
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
      issue.issueType,
      issue.summary,
      issue.description,
      issue.assignee,
      issue.priority,
      issue.epicLink,
      issue.sprint,
      issue.storyPoints,
    );
  };

  const editTemplateHandler = () => {
    issues.forEach(issue => {
      if (issue.issueTemplateId === editNo) {
        issueTypeRef.current
          ? (issue.issueType =
              issueTypeRef.current.value === '스토리'
                ? 'Story'
                : issueTypeRef.current.value === '태스크'
                ? 'Task'
                : issueTypeRef.current.value === '버그'
                ? 'Bug'
                : 'Error')
          : '';
        summaryRef.current ? (issue.summary = summaryRef.current.value) : '';
        descriptionRef.current ? (issue.description = descriptionRef.current.value) : '';
        assigneeRef.current ? (issue.assignee = assigneeRef.current.value) : '';
        priorityRef.current ? (issue.priority = priorityRef.current.value) : '';
        epicLinkRef.current ? (issue.epicLink = epicLinkRef.current.value) : '';
        storyPointsRef.current ? (issue.storyPoints = Number(storyPointsRef.current.value)) : '';
      }
      issueAxios.putEditIssueTemplate(
        issue.projectId,
        issue.issueType,
        issue.summary,
        issue.description,
        issue.assignee,
        issue.priority,
        issue.epicLink,
        issue.storyPoints,
        issue.issueTemplateId,
      );
    });
    setIsEdit(false);
  };

  const insertIssueHandler = () => {
    props.setIssue({
      templateId: props.issue.templateId,
      projectId: projectId,
      issueType: issueTypeRef.current
        ? issueTypeRef.current.value === '스토리'
          ? 'Story'
          : issueTypeRef.current.value === '태스크'
          ? 'Task'
          : issueTypeRef.current.value === '버그'
          ? 'Bug'
          : 'Error'
        : '',
      summary: summaryRef.current ? summaryRef.current.value : '',
      description: descriptionRef.current ? descriptionRef.current.value : '',
      epicLink: epicLinkRef.current ? epicLinkRef.current.value : '',
      assignee: assigneeRef.current ? assigneeRef.current.value : '',
      priority: priorityRef.current ? priorityRef.current.value : '',
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
        <Text isFill={false} message={'이슈 템플릿'} fontSize={'1.5rem'} fontWeight={'bold'} />
        <Sheet borderColor={'transparent'} flex={'column'} isOverflowYScroll>
          <StyledIssueTemplateBody>{IssueList}</StyledIssueTemplateBody>
        </Sheet>
        <Button
          width={'400px'}
          height={'90px'}
          borderColor={'#d9d9d9'}
          clickHandler={addEnableHandler}
          isHover
        >
          <HiPlus size={'1.5rem'} />
        </Button>
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
              inputValue={getProject.data ? getProject.data.name : ''}
              ref={projectRef}
              disabled
            />
            <SelectBox labelName={'이슈 유형'} ref={issueTypeRef}>
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
            <SelectBox labelName={'담당자'} ref={assigneeRef}>
              <Option
                messages={memberList ? memberList : ['']}
                selected={props.issue.assignee}
              ></Option>
            </SelectBox>
            <span style={{ color: '#4BADE8', cursor: 'pointer' }}>나에게 할당</span>
            <SelectBox labelName={'우선순위'} ref={priorityRef}>
              <Option
                messages={['Highest', 'High', 'Medium', 'Low', 'Lowest']}
                selected={props.issue.priority}
              ></Option>
            </SelectBox>
            <SelectBox labelName={'Epic Link'} ref={epicLinkRef}>
              <Option
                messages={epicList ? epicList : ['']}
                selected={props.issue.epicLink}
                keys={keyList ? keyList : ['']}
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
