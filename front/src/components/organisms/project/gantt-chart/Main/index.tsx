// Styles
import { StyledMain } from './style';

// Components
// import { GanttGraph } from './GanttGraph';
import { Calendar } from './Calendar';

export const Main = () => {
  return (
    <>
      <StyledMain>
        <div>수정중</div>
        {/* <GanttGraph></GanttGraph> */}
        <Calendar></Calendar>
      </StyledMain>
    </>
  );
};
