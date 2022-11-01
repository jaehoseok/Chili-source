import {
  StyledIssueBar,
  StyledIssueBarType,
  StyledIssueBarContent,
  StyledIssueBarElement,
  styledType,
} from './style';

import Text from '../../atoms/Text';
import Circle from '../../atoms/Circle';

interface propsType extends styledType {
  project?: string;
  summary?: string;
  reporter?: string;
  assignee?: string;
  rank?: string;
  epicLink?: string;
  sprint?: string;
  storyPoints?: number;
}

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
  const issueSummary = summary ? summary : '';
  const issueEpicLink = epicLink ? epicLink : '';
  const issueStoryPoints = storyPoints ? storyPoints : '';
  return (
    <>
      <StyledIssueBar width={width} height={height} type={type}>
        <StyledIssueBarType width={width} type={type}></StyledIssueBarType>
        <StyledIssueBarContent>
          <Text isFill={false} message={issueSummary}></Text>
          <StyledIssueBarElement>
            <Text width={24} isFill={issueEpicLink !== ''} message={issueEpicLink}></Text>
            <Circle height={24}>{assignee}</Circle>
            <Circle height={24}>{rank}</Circle>
            <Text width={24} isFill={true} message={issueStoryPoints + ''}></Text>
          </StyledIssueBarElement>
        </StyledIssueBarContent>
      </StyledIssueBar>
    </>
  );
};

export default index;
