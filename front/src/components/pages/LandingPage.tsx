import IssueBar from '../molecules/IssueBar';
import Issue from '../molecules/Issue';

const LandingPage = () => {
  return (
    <IssueBar
      summary={'이슈 제목'}
      epicLink={'에픽'}
      assignee={'담당자'}
      rank={'우선순위'}
      type={'story'}
      storyPoints={4}
    ></IssueBar>
    // <Issue
    //   summary={'이슈 제목'}
    //   epicLink={'에픽'}
    //   assignee={'담당자'}
    //   rank={'우선순위'}
    //   type={'story'}
    //   storyPoints={4}
    // ></Issue>
  );
};

export default LandingPage;
