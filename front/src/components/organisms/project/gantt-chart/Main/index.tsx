// API & Library
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Styles
import { StyledMain } from './style';

// Components
import { GanttGraph } from './GanttGraph';
import { GanttList } from './GanttList';

export const Main = () => {
  // Init
  return (
    <DndProvider backend={HTML5Backend}>
      <StyledMain className="main">
        <GanttList />
        <GanttGraph />
      </StyledMain>
    </DndProvider>
  );
};
