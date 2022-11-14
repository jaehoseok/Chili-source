// API & Library
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useGetUserInfoHandler } from 'hooks/user';

// Styles
import { StyledMain } from './style';

// Components
import { GanttGraph } from './GanttGraph';
import { GanttList } from './GanttList';
// import { Calendar } from './Calendar';

export const Main = () => {
  // Init
  const getUserInfo = useGetUserInfoHandler().data;
  return (
    <DndProvider backend={HTML5Backend}>
      <StyledMain className="main">
        <GanttList />
        <GanttGraph />
      </StyledMain>
    </DndProvider>
  );
};
