// API & Library
import { ReactNode } from 'react';
import { useDrop } from 'react-dnd';
import { itemType } from '../';

// Styles
import { StyledWidgetDropSpace, styledType } from './style';

interface propsType extends styledType {
  children?: ReactNode;
  data?: any;
  onDrop?: any;
  path?: string;
  type?: string;
}

export const WidgetDropSpace = ({
  children,
  onDrop,
  isHorizontal,
  isLast,
  path,
  type,
}: propsType) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [
      'ITEM',
      'COLUMN',
      'CALENDAR',
      'FIGMA',
      'GANTT',
      'GATHER',
      'JIRA',
      'SSAFYGITLAB',
      'WEBEX',
      'ZOOM',
    ],
    drop: item => {
      const dropItem: itemType = {
        type,
        id: 0,
        path,
        children: [],
      };
      onDrop(dropItem, item);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  return (
    <StyledWidgetDropSpace
      className="widget-drop-space"
      ref={drop}
      isActive={isActive}
      isLast={isLast}
      isHorizontal={isHorizontal}
    >
      {children}
    </StyledWidgetDropSpace>
  );
};
