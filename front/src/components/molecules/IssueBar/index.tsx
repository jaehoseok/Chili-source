import {
  StyledIssueBar,
  StyledIssueBarType,
  StyledIssueBarContent,
  StyledIssueBarLeft,
  StyledIssueBarRight,
  StyledIssueElement,
  styledType,
} from './style';

type propsType = styledType;

const index = ({
  width,
  height,
  project,
  type,
  summary,
  reporter,
  assignee,
  rank,
  epicLink,
  sprint,
  storyPoints,
}: propsType) => {
  return (
    <>
      <StyledIssueBar
        width={width}
        height={height}
        project={project}
        type={type}
        summary={summary}
        reporter={reporter}
        assignee={assignee}
        rank={rank}
        epicLink={epicLink}
        sprint={sprint}
        storyPoints={storyPoints}
      >
        <StyledIssueBarType width={width} type={type}></StyledIssueBarType>
        <StyledIssueBarContent
          summary={summary}
          epicLink={epicLink}
          assignee={assignee}
          rank={rank}
          storyPoints={4}
          type={'none'}
        >
          <StyledIssueBarLeft type={'none'}>{summary}</StyledIssueBarLeft>
          <StyledIssueBarRight type={'none'}>
            <StyledIssueElement type={'epicLink'}>{epicLink}</StyledIssueElement>
            <StyledIssueElement type={'assignee'}>{assignee}</StyledIssueElement>
            <StyledIssueElement type={'rank'}>{rank}</StyledIssueElement>
            <StyledIssueElement type={'storyPoints'}>{storyPoints}</StyledIssueElement>
          </StyledIssueBarRight>
        </StyledIssueBarContent>
      </StyledIssueBar>
    </>
  );
};

export default index;
