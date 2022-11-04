// Styles
import { StyledAside } from './style';

// Components
import { GanttIssue } from 'components/molecules/GanttIssue';

export const Aside = () => {
  return (
    <>
      <StyledAside>
        <GanttIssue></GanttIssue>
      </StyledAside>
    </>
  );
};
