import { useState } from 'react';

import MiddleBucket from '../organisms/MiddleBucket';
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
    storyPoints: 0,
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
        reporter={'팀원1'}
        assignee={'팀원3'}
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
      <IssueInfo info={info} setInfo={setInfo}></IssueInfo>
      <MiddleBucket info={info}></MiddleBucket>
    </>
  );
};

export default IssuesPage;
