import { useState } from 'react';

import IssueInfo from '../organisms/IssueInfo';
import Issue from '../molecules/Issue';
import Button from '../atoms/Button';

import NavProject from '../molecules/NavProject';
import NavWidget from '../molecules/NavWidget';

const IssuesPage = () => {
  const issue = {
    project: '',
    type: '',
    summary: '',
    reporter: '',
    assignee: '',
    rank: '',
    epicLink: '',
    sprint: '',
    storyPoints: 234234,
  };
  const [info, setInfo] = useState(issue);
  const setInfoHandler = (props: any) => {
    setInfo(props);
  };
  return (
    <>
      <Issue
        project={'프로젝트 명'}
        summary={'이슈 제목'}
        epicLink={'에픽1'}
        reporter={'팀원'}
        assignee={'팀원'}
        rank={'Low'}
        type={'story'}
        sprint={'스프린트1'}
        storyPoints={8}
        clickHandler={setInfoHandler}
      />
      <Issue
        summary={'이슈 제목2'}
        epicLink={'에픽2'}
        reporter={'팀원2'}
        assignee={'팀원2'}
        rank={'High'}
        type={'task'}
        sprint={'스프린트2'}
        storyPoints={4}
        clickHandler={setInfoHandler}
      />
      <IssueInfo info={info}></IssueInfo>
      <Button borderColor="green" clickHandler={() => console.log(info)}>
        IssueInfo Test
      </Button>
    </>
  );
};

export default IssuesPage;
