// API & Library
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Styles
import { StyledMain } from './style';

// Components
import { GanttList } from './GanttList';
import { GanttGraph } from './GanttGraph';

export const Main = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <StyledMain className="main">
        <GanttList />
        <GanttGraph />
      </StyledMain>
    </DndProvider>
  );
};
