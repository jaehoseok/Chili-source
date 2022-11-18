// Styles
import {
  StyledWidgetData,
  StyledWidgetDataLabel,
  StyledWidgetDataContent,
  styledType,
} from '../style';

interface propsType extends styledType {
  url?: string | null;
  path?: string;
}

export const SSAFYGITLAB = ({ url }: propsType) => {
  // Methods
  const clickHandler = () => {
    console.log('[GIT]: ', url);
  };

  // Return
  return (
    <>
      <StyledWidgetData ratio="1/2" height="265px" onClick={clickHandler}>
        <StyledWidgetDataLabel>깃랩</StyledWidgetDataLabel>
        <StyledWidgetDataContent>{url}</StyledWidgetDataContent>
      </StyledWidgetData>
    </>
  );
};
