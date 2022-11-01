import IssueBar from '../molecules/IssueBar';
import Issue from '../molecules/Issue';
import ProjectItem from '../molecules/ProjectItem';
import GitLog from '../../assets/images/GitLog.png';
import TokenBox from '../molecules/TokenBox';
import Button from '../atoms/Button';

const LandingPage = () => {
  return (
    <>
      {/* <TokenBox labelText={'Jira 토큰'}></TokenBox> */}
      <ProjectItem
        logoImg={GitLog}
        title={'Project 1'}
        leader={'dbcs'}
        members={['dbcs', 'inte', 'bell']}
      />

      {/* <IssueBar
        summary={'이슈 제목'}
        epicLink={'에픽'}
        assignee={'담'}
        rank={'우'}
        type={'story'}
        storyPoints={4}
      ></IssueBar> */}
      {/* <Issue
        summary={'이슈 제목'}
        epicLink={'에픽'}
        assignee={'담'}
        rank={'우'}
        type={'story'}
        storyPoints={4}
      ></Issue> */}
    </>
  );
};

export default LandingPage;
