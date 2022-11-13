// Styles
import { useState } from 'react';
import { StyledGanttList } from './style';

// Components
import { GanttListItem } from '../GanttListItem';

// Types
export interface ganttType {
  id?: number;
}

export const GanttList = () => {
  // Init
  const [ganttList, setGanttList] = useState([{}, {}, {}, {}, {}, {}]);

  return (
    <>
      <StyledGanttList className="gantt-aside">
        {ganttList.map((item, index) => {
          return (
            <div key={index}>
              <GanttListItem />
            </div>
          );
        })}
      </StyledGanttList>
    </>
  );
};
