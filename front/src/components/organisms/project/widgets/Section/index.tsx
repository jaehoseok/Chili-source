// API & Library
import { INITIAL_DATA } from './constants';

// Styles
import { StyledSection, StyledSectionColumn } from './style';

// Components
import { WidgetBlock } from 'components/molecules/WidgetBlock';

interface propTypes {
  data?: string;
}

function Section({}: propTypes) {
  return (
    <>
      <StyledSection>
        <StyledSectionColumn>
          <WidgetBlock type="GanttChart"></WidgetBlock>
          <WidgetBlock type=""></WidgetBlock>
          <WidgetBlock type=""></WidgetBlock>
          <WidgetBlock type=""></WidgetBlock>
          <WidgetBlock type=""></WidgetBlock>
        </StyledSectionColumn>

        <StyledSectionColumn>
          <WidgetBlock type="GanttChart"></WidgetBlock>
          <WidgetBlock type=""></WidgetBlock>
          <WidgetBlock type=""></WidgetBlock>
          <WidgetBlock type=""></WidgetBlock>
          <WidgetBlock type=""></WidgetBlock>
        </StyledSectionColumn>

        <StyledSectionColumn>
          <WidgetBlock type="GanttChart"></WidgetBlock>
          <WidgetBlock type=""></WidgetBlock>
          <WidgetBlock type=""></WidgetBlock>
          <WidgetBlock type=""></WidgetBlock>
          <WidgetBlock type=""></WidgetBlock>
        </StyledSectionColumn>
      </StyledSection>
    </>
  );
}

export default Section;
