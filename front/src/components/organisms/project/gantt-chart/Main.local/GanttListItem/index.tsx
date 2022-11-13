// API & Library
import { useDrag } from 'react-dnd';

// Styles
import { StyledGanttListItem } from './style';

// Components
import { GanttIssue } from 'components/molecules/GanttIssue';

// Types
interface propsType {
  id?: number;
}

export const GanttListItem = ({ id }: propsType) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: {
      id,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  return (
    <>
      <StyledGanttListItem className="gantt-item" ref={drag} style={{ opacity }}>
        <GanttIssue></GanttIssue>
      </StyledGanttListItem>
    </>
  );
};
