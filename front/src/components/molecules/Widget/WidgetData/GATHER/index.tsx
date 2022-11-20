// API & Library
import { propsType } from '../..';

// Styles
import { StyledWidgetData, StyledWidgetDataLabel, StyledWidgetDataContent } from '../style';

export const GATHER = ({ url, id }: propsType) => {
  // Methods
  const clickHandler = () => {
    alert('아직 개발하고 있는 기능입니다.');
    // window.open('https://www.gather.town/', 'PopupNew', 'width=500,height=500');
  };

  // Return
  return (
    <>
      <StyledWidgetData ratio="1/4" height="120px" onClick={clickHandler}>
        <StyledWidgetDataLabel>게더</StyledWidgetDataLabel>
        <StyledWidgetDataContent>
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={require('assets/images/widgets/GATHER.png')} width={72} alt="게더" />
          </div>
        </StyledWidgetDataContent>
      </StyledWidgetData>
    </>
  );
};
