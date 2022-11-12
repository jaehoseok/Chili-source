// API & Library
import { useDrop } from 'react-dnd';
import { BsTrash } from 'react-icons/bs';
import { itemType } from '../';

// Styles
import { StyledWidgetTrashCan } from './style';

interface propsType {
  data?: any;
  onThrow?: any;
  isLast?: any;
  className?: any;
  path?: any;
}

export const WidgetTrashCan = ({ onThrow }: propsType) => {
  // Init
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ['ITEM', 'COLUMN', 'CALENDAR', 'GANTT', 'JIRA', 'SSAFYGITLAB'],
    drop: (item: itemType) => {
      onThrow(item);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  return (
    <>
      <StyledWidgetTrashCan ref={drop} isActive={isActive}>
        <BsTrash />
      </StyledWidgetTrashCan>
    </>
  );
};
