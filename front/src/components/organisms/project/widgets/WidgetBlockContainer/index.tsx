// Styles
import { StyledWidgetBlockContainer, StyledSectionColumn } from './style';

// Components
import { WidgetBlock } from 'components/molecules/WidgetBlock';

export const WidgetBlockContainer = () => {
  // Init
  const widgetBlockData = [{}];

  return (
    <>
      <StyledWidgetBlockContainer>
        <StyledSectionColumn>
          <div>sd</div>
          <WidgetBlock type="GANTT"></WidgetBlock>
          <WidgetBlock type="CALENDAR"></WidgetBlock>
          <WidgetBlock type="JIRA"></WidgetBlock>
          <WidgetBlock type="SSAFYGITLAB"></WidgetBlock>
          <WidgetBlock type=""></WidgetBlock>
        </StyledSectionColumn>

        <StyledSectionColumn>
          <WidgetBlock type="GANTT"></WidgetBlock>
        </StyledSectionColumn>
      </StyledWidgetBlockContainer>
    </>
  );
};
