import IssueInfo from '../organisms/IssueInfo';
import Issue from '../molecules/Issue';
import NavProject from '../molecules/NavProject';
import NavWidget from '../molecules/NavWidget';

const LandingPage = () => {
  return (
    <>
      <Issue
        summary={'이슈 제목'}
        epicLink={'에픽'}
        assignee={'담'}
        rank={'L'}
        type={'story'}
        storyPoints={4}
      />
      <IssueInfo></IssueInfo>
    </>
  );
};

export default LandingPage;
