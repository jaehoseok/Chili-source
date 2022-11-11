import { useState, useEffect } from 'react';
import { StyledIssueTemplate, StyledHeader, StyledBody } from './style';
import { issueType, templateType } from 'components/pages/IssuesPage';
import Issue from 'components/molecules/Issue';
import Circle from 'components/atoms/Circle';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';

const index = (props: any) => {
  const setInfoHandler = (issue: templateType) => {
    props.setInfo(issue);
  };
  const deleteHandler = (templateId: number) => {
    props.setIssues(props.issues.filter((issue: templateType) => issue.templateId !== templateId));
  };
  const editEnableHandler = (templateId: number) => {
    alert('이슈 수정 버튼 활성화');
    props.setIsEdit(true);
  };
  const addEnableHandler = () => {
    alert('이슈 추가 버튼 활성화');
    props.setIsAdd(true);
  };
  useEffect(() => {
    if (!props.isAdd) {
      props.issues.push(props.info);
      props.setIssues(props.issues);
      props.setIsAdd(false);
    }
  }, [props.isAdd]);

  const IssueList = props.issues.map((issue: templateType) => (
    <Issue
      templateId={issue.templateId}
      project={issue.project}
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
    project: '프로젝트1',
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
    project: '프로젝트2',
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
    project: '프로젝트3',
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
  useEffect(() => {
    props.setIssues([issue1, issue2, issue3]);
  }, []);

  return (
    <StyledIssueTemplate>
      <StyledHeader>
        <Circle height={'5rem'} margin={'1rem'}>
          로고
        </Circle>
        <Text isFill={false} message={'프로젝트 명'} fontSize={'2.5rem'} />
      </StyledHeader>
      <hr style={{ backgroundColor: 'gray', borderColor: 'lightgray', width: '400px' }} />

      <StyledBody>
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
      </StyledBody>
    </StyledIssueTemplate>
  );
};

export default index;
