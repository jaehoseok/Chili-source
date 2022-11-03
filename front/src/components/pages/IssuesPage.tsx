import { useState } from 'react';

import IssueInfo from '../organisms/IssueInfo';
import Issue from '../molecules/Issue';
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
        epicLink={'에픽'}
        assignee={'담'}
        rank={'L'}
        type={'story'}
        storyPoints={8}
        clickHandler={setInfoHandler}
      />
      <Issue
        summary={'이슈 제목2'}
        epicLink={'에픽2'}
        assignee={'당'}
        rank={'H'}
        type={'task'}
        storyPoints={4}
        clickHandler={setInfoHandler}
      />
      <IssueInfo info={info}></IssueInfo>
    </>
  );
};

export default IssuesPage;
