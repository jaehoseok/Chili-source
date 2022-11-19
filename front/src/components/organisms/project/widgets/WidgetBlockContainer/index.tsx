// Styles
import { StyledWidgetBlockContainer, StyledWidgetBlockBox } from './style';

// Components
import { WidgetBlock } from 'components/molecules/WidgetBlock';

export const WidgetBlockContainer = () => {
  // Init
  const widgetBlockData = [[], []];

  return (
    <>
      <StyledWidgetBlockContainer>
        <StyledWidgetBlockBox>
          <WidgetBlock type="GANTT"></WidgetBlock>
          <WidgetBlock type="CALENDAR"></WidgetBlock>
          <WidgetBlock type="JIRA"></WidgetBlock>
          <WidgetBlock type="SSAFYGITLAB"></WidgetBlock>
          <WidgetBlock type=""></WidgetBlock>
        </StyledWidgetBlockBox>
      </StyledWidgetBlockContainer>
    </>
  );
};
