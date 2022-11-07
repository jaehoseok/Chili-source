// API & Library
import { useDrop } from 'react-dnd';
import { itemType } from '../';

// Styles
import { StyledWidgetDropSpace, styledType } from './style';

interface propsType extends styledType {
  data?: any;
  onDrop?: any;
  path?: string;
  type?: string;
}

export const WidgetDropSpace = ({ onDrop, isHorizontal, path, type }: propsType) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ['COLUMN', 'ITEM'],
    drop: item => {
      const dropItem: itemType = {
        type,
        id: '-',
        path,
      };
      onDrop(dropItem, item);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  return <StyledWidgetDropSpace ref={drop} isActive={isActive} isHorizontal={isHorizontal} />;
};
